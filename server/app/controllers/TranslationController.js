const db = require('../../database/models');
const BaseController = require('./base/BaseController');
const { Upsert } = require('../../utils');
const fs = require('fs');

class TranslationController extends BaseController {
  constructor(db) {
    super(db.TranslationKey);
    this.db = db;

    this.tranlsationZipName = 'translations';
    this.translationFolder = `${process.cwd()}\\app\\${this.tranlsationZipName}`;
    this.translationZipFolder = `${process.cwd()}\\app\\translation_zip`;
  }

  //id	translation_key	locales	value	createdAt	updatedAt

  deleteKeys = (row, keys) => {
    delete row.key;
    delete row.translation_key;

    keys.forEach((element) => {
      delete row[element];
    });

    return row;
  };

  insertKeyToDb = async (translationKey) => {
    let result = await this.model.create({ translation_key: translationKey });
    return result.id;
  };

  insertDataToTranslationDb = async (row, translationId) => {
    row = this.deleteKeys(row, ['key', 'translation_key', 'id']);

    for (const [key, value] of Object.entries(row)) {
      await this.db.Translation.create({ translation_key_id: translationId, locales: key, value });
    }
  };

  updateTranslationKey = async (row) => {
    await this.model.update({ translation_key_id: row.key }, { where: { id: row.id } });
  };

  updateTranslationData = async (row, translationId) => {
    let locale = await this.db.Locale.findAll();

    let newLocale = locale.map((d) => {
      return d.dataValues.locale;
    });

    for (let [key, value] of Object.entries(row)) {
      if (!newLocale.includes(key) && value === '*null*') {
        delete row[key];
      }
    }

    row = this.deleteKeys(row, ['key', 'translation_key', 'translation_key_id']);

    // for (const [key, value] of Object.entries(row)) {
    //  let locale = await this.db.Locale.findAll();

    let trans = locale.map((e) => ({ translation_key_id: row.id, locale_id: e.id, value: row[e.locale] }));

    //Model, values, { options, includes = {}, where, findBy = 'id' }
    await Upsert.init(this.db.Translation, trans, {
      options: { updateOnDuplicate: ['translation_key_id', 'locale_id'] }
    });
    // await this.db.Translation.update(
    //   { value },
    //   { where: { translation_key_id: translationId, locale_id: locale.id } }
    // );
  };
  // };

  insertData = async (params) => {
    let { row } = params;

    //{ id: 0, translation_key: '3333', en: 'Text', de: 'Text', key: 2 }

    // for (let row of dataTrans) {
    //   let translationKey = row.translation_key;

    //   let translationId = await this.insertKeyToDb(translationKey);
    //   await this.insertDataToTranslationDb(row, translationId);
    // }

    if (row.hasOwnProperty('id') && row.id !== 0) {
      let id = row.id;
      //update
      await this.updateTranslationKey(row);
      await this.updateTranslationData(row, row.id);
      return { id };
    } else {
      //ADD
      let translationKey = row.translation_key;

      let translationId = await this.insertKeyToDb(translationKey);
      await this.insertDataToTranslationDb(row, translationId);

      return { id: translationId };
    }
  };

  generateArray = () => {
    let array = [];
    // { id: 0, translation_key: '3333', en: 'Text', de: 'Text', key: 2 }

    let index = 1;
    for (let [key, value] of Object.entries(en)) {
      array.push({ id: 0, translation_key: key, en: value, de: de[key], key: index });
      index++;
    }

    return new Promise((resolve, reject) => {
      if (1 === 0) {
        reject(false);
      } else {
        resolve(array);
      }
    });
  };

  getData = async (params) => {
    let result = await this.model.findAll({
      include: [
        { association: this.db.TranslationKey.Translation, include: [{ association: this.db.Translation.Locale }] }
      ],
      order: [['id', 'DESC']]
    });

    let data = [];

    data = result.map((d) => {
      let translations = this.formatTranslations(d.Translations);

      let { Translations, ...rest } = d.dataValues;

      return { ...rest, ...translations, key: d.dataValues.id, locale: d.dataValues.Translations };
    });

    return data;
  };

  formatTranslations = (translations) => {
    let translationObject = {};
    translations.forEach((d) => {
      translationObject[d.dataValues.locale.locale] = d.dataValues.value;
    });

    return translationObject;
  };

  convertArraytoObject = (translate) => {
    return translate.reduce((acc, curr) => ((acc[curr] = []), acc), {});
  };

  separateTranslationCountry = (result, converted) => {
    result.forEach((d, i) => {
      for (let [key, value] of Object.entries(converted)) {
        d.Translations.forEach((c) => {
          c.dataValues.translation_key_id = d.dataValues.translation_key;
          converted[c.dataValues.locale.dataValues.locale] = [
            ...converted[c.dataValues.locale.dataValues.locale],
            c.dataValues
          ];
        });
      }
    });
  };

  generateJSONFile = (converted, json) => {
    try {
      for (let [key, value] of Object.entries(converted)) {
        value.forEach((d) => {
          json[d.translation_key_id] = d.value;
        });
        fs.writeFileSync(
          `${this.translationFolder}\\translation_${key.toLocaleLowerCase()}.json`,
          JSON.stringify(json, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  generateJSON = async () => {
    let result = await this.model.findAll({
      include: [
        { association: this.db.TranslationKey.Translation, include: [{ association: this.db.Translation.Locale }] }
      ]
    });
    // return result;
    let translate = await this.db.Locale.findAll({});
    translate = translate.map((row) => {
      return row.locale;
    });

    let converted = this.convertArraytoObject(translate);

    // console.log(converted, '------------------');

    let json = {};

    this.separateTranslationCountry(result, converted);
    // console.log(converted, '-------------------2');

    this.generateJSONFile(converted, json);

    //this._zipDirectory(this.translationFolder, `${this.translationZipFolder}/${this.tranlsationZipName}.zip`);
    // console.log(json);
  };

  beginDownload = async (_, [req, res, next]) => {
    return new Promise((resolve, reject) => {
      res.download(`${this.translationZipFolder}\\${this.tranlsationZipName}.zip`, (err) => {
        console.log(err);
        if (err) {
          console.log(err);
          reject(err); // Check error if you want
        }
        fs.unlink(`${this.translationZipFolder}\\${this.tranlsationZipName}.zip`, function () {
          console.log('File was deleted'); // Callback
          resolve(true);
        });
      });
    });
  };

  // /**
  //  * @param {String} source
  //  * @param {String} out
  //  * @returns {Promise}
  //  */

  // _zipDirectory = (source, out) => {
  //   const archive = archiver('zip', { zlib: { level: 9 } });
  //   const stream = fs.createWriteStream(out);
  //   return new Promise((resolve, reject) => {
  //     archive
  //       .directory(source, false)
  //       .on('error', (err) => reject(err))
  //       .pipe(stream);

  //     stream.on('close', () => resolve());
  //     archive.finalize();
  //   });
  // };
}

module.exports = (db) => new TranslationController(db);

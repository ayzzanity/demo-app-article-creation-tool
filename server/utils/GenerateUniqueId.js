module.exports = class GenerateUniqueId {
  static init() {
    return Math.floor(Math.random() * Date.now());
  }
};

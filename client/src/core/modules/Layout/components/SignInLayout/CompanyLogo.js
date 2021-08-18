import React from 'react';
import { Image } from 'antd';

/**CORE IMPORTS */
import Logo from '@core_assets/images/company_logo.png';

function CampanyLogo() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center mb-3">
      <Image width={120} src={Logo} preview={false} />
    </div>
  );
}

export default CampanyLogo;

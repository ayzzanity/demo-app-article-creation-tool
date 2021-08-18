import React from 'react';
import { useTranslation } from 'react-i18next';

import Countdown from 'react-countdown';
import { inject, observer } from 'mobx-react';

import { ResetPasswordController } from '@core_modules/ResetPassword/controller';
import { Typography } from 'antd';

const { Text } = Typography;

function CountdownComponent({ store }) {
  const { t } = useTranslation('common');

  const { handleStopCountdown, handleCountdownTick } = ResetPasswordController({ store });

  const countdownTimeLeft =
    parseInt(localStorage.getItem('countdownTimeLeft')) || Date.now() + 120000;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      localStorage.removeItem('countdownTimeLeft');
      return null;
    } else {
      // Render a countdown
      return (
        <Text type="secondary">
          {t('Resend request after')} &nbsp; 0{minutes}:{seconds}
        </Text>
      );
    }
  };

  return (
    <div className="text-center">
      <Countdown
        onTick={handleCountdownTick}
        precision={3}
        date={countdownTimeLeft}
        onComplete={handleStopCountdown}
        renderer={renderer}
      />
    </div>
  );
}

export default inject('store')(observer(CountdownComponent));

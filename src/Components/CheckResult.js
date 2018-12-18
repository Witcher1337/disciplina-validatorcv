// @flow
import React from 'react';

type CheckResultProps = {
  isValid: boolean
}

const CheckResult = ({ isValid }: CheckResultProps) => (
  <div
    className={`condition__status ${isValid ? 'condition__status--ok' : 'condition__status--error'}`}>
    {`This FairCV is ${isValid ? '' : 'not'} valid`}
  </div>
);

export default CheckResult;

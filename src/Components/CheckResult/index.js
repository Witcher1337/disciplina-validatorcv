// @flow
import React from 'react';

type CheckResultProps = {
  isValid: boolean
}

const CheckResult = ({ isValid }: CheckResultProps) => (
  isValid ? <h5>valid</h5> : <h5>invalid</h5>
);

export default CheckResult;

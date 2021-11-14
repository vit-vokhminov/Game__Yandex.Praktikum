import React, { ReactElement } from 'react';
import type { DistanceProps } from './types';

import './distance.css';

const Distance = ({ distance }: DistanceProps): ReactElement => (
    <div className="distance">{distance}</div>
);

export default Distance;

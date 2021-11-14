import React from 'react';
import type { InstructionItemProps } from './types';

import './instruction-item.css';

const InstructionItem = ({ imgLink, imgAlt, text }: InstructionItemProps) => (
    <div className="instruction">
        <div className="instruction__img">
            <img src={imgLink} alt={imgAlt} />
        </div>
        <div className="instruction__text">{text}</div>
    </div>
);

export default InstructionItem;

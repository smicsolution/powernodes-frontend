import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Tooltip } from 'antd'
import { FiCopy } from 'react-icons/fi'

import './style.css'

const Copyable = ({ text, copiedText, setCopiedText }) => {
  return (
    <React.Fragment>
      <CopyToClipboard text={text} onCopy={() => setCopiedText(text)}>
        <p className="mb-0 text-center my-4">
          <span className="cl-white-80 me-2">{text}</span>
          <Tooltip
            title={copiedText === text ? "Copied" : "Copy"}
            placement="top"
          >
            <FiCopy className="cl-orange fs-5 copy-icon" />
          </Tooltip>
        </p>
      </CopyToClipboard>
    </React.Fragment>
  );
}

export default Copyable;
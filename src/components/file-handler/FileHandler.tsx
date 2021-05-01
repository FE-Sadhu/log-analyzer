import React, { FC, useState } from 'react';
import style from './FileHandler.css';
import search from './image/search.png';
import timeUtils from '../../utils/time';

const TAG = 'FileHandler';
interface FileInfo {
  name: string;
  lastModified: number;
  lastModifiedDate?: Date;
  size: number;
  webkitRelativePath: string;
  type: string;
  arrayBuffer: () => any;
  slice: () => any;
  stream: () => any;
  text: () => any;
  // [propNames: string]: any | (() => any);
}

interface FileNeeded {
  name: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  size: string;
  type: string;
  [propNames: string]: any | (() => any);
}

type FileEntity = Array<string | null>;

const BEFORE_AWAKE = 'drop your file here or click';
const AFTER_AWAKE = 'come baby';
const FILE_INFO = {
  name: '',
  size: -99 + 'M',
  type: '',
  lastModTime: '',
};

const FileHandler: FC = () => {
  const [fileEntity, setFileEntity] = useState<FileEntity>();
  const [awake, setAwake] = useState(BEFORE_AWAKE);
  const [fileInfo, setFileInfo] = useState<FileNeeded>(FILE_INFO);

  const onChange = (e) => {
    console.log(e);
  };

  const onDrop = (e) => {
    console.log('Drop >>> ');
    e.preventDefault();
    setAwake(BEFORE_AWAKE);
    const file: FileInfo = e.dataTransfer.files[0];
    handleFiles(file);
  };

  const onDragEnter = (e) => {
    console.log('Enter >>> ');
    e.preventDefault();
    setAwake(AFTER_AWAKE);
  };

  const onDragOver = (e) => {
    console.log('Over >>> ');
    e.preventDefault();
  };

  const onDragLeave = (e) => {
    console.log('Leave >>> ');
    setAwake(BEFORE_AWAKE);
  };

  const onDragExit = (e) => {
    console.log('Exit >>> ');
  };

  const onClickInput = (e) => {
    console.log('Click >>> ');
    const file: FileInfo = e.target.files[0];
    handleFiles(file);
  };

  const handleFiles = (file: FileInfo) => {
    console.table(file);
    const { wholeTime: lastModTime } = timeUtils.getTimeFromDate(file.lastModifiedDate);
    const targetFileInfo = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + 'M',
      type: file.type,
      lastModTime,
    };
    setFileInfo({ ...fileInfo, ...targetFileInfo });

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('result >>>> ', e.target?.result);
      const origin: string = e.target!.result as string;
      const split = origin!.split('\n');
      console.log('split >>>> ', split);
      setFileEntity(split);
    };
    reader.readAsText(file);
  };

  const getProperDisplay = () => {
    return fileEntity ? (
      <>
        <div className={style.fileInfo}>
          <em className="remind">{'FILE INFO -> '}</em>
          {Object.keys(fileInfo).map((key) => (
            <div key={key} className={style.fileInfoItem}>
              <div className={style.infoLeft}>{key}</div>
              {': '}
              <div className={style.infoRight}>{fileInfo[key]}</div>
              &nbsp;&nbsp;&nbsp;
            </div>
          ))}
        </div>
        <div className={style.inputWrapper}>
          <img src={search} alt="oops..." className={style.prefix} />
          <input placeholder="write in RegExp to sift what u want" className={style.input} onChange={onChange} />
        </div>
        <div className={style.showList}>
          {fileEntity.map((item, index) => (
            <div key={index} className={style.listItem}>
              <span>{`${index + 1}. `}</span>
              <span className={style.listContent}>{item}</span>
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <label
          htmlFor="file"
          className={style.dropArea}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragExit={onDragExit}
          onDragLeave={onDragLeave}
        >
          {awake}
        </label>
        <input onChange={onClickInput} type="file" id="file" className={style.inputUpload} />
      </>
    );
  };
  return <div className={style.wrapper}>{getProperDisplay()}</div>;
};

export default FileHandler;

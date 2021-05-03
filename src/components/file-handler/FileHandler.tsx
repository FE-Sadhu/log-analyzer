import React, { FC, useState } from 'react';
import style from './FileHandler.css';
import search from './image/search.png';
import timeUtils from '../../utils/time';
import utils from '../../utils';
import transition from '../common/transition';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 280,
  },
}));

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

let BUFFER: Array<string> = [];

const FileHandler: FC = () => {
  const [fileEntity, setFileEntity] = useState<FileEntity>();
  const [awake, setAwake] = useState(BEFORE_AWAKE);
  const [fileInfo, setFileInfo] = useState<FileNeeded>(FILE_INFO);
  const classes = useStyles();
  const onChange = (e) => {
    const userInput = e.target.value;
    if (!userInput) {
      setFileEntity(BUFFER);
    }
    const re = new RegExp(e.target.value);
    console.log('re >>> ', re);
    // const filter = BUFFER.filter((str) => re.test(str));
    const length = BUFFER.length;
    const filter: string[] = [];
    // 普通 for 循环是 ForEach 性能的 30 多倍，filter map 等性能更差
    for (let i = 0; i < length; i++) {
      const item = BUFFER[i];
      if (re.test(item)) {
        filter.push(item);
      }
    }
    setFileEntity(filter);
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
    transition.show();
    console.table(file);
    const { wholeTime: lastModTime } = timeUtils.getTimeFromDate(file.lastModifiedDate);
    const targetFileInfo = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + 'M',
      type: file.type,
      lastModTime,
    };
    setFileInfo((prevFileInfo) => {
      return { ...prevFileInfo, ...targetFileInfo };
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      transition.disappear();
      const origin: string = e.target!.result as string;
      Promise.resolve().then(() => {
        const split = origin!.split('\n');
        const res = split.map((item) => {
          return item.replace('$$info$$', '');
        });
        setFileEntity(res);
        BUFFER = res;
      });
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
          <div className={style.regExp}>
            <img src={search} alt="oops..." className={style.prefix} />
            <input
              placeholder="write in RegExp to sift what u want"
              className={style.input}
              onChange={utils.debounce(onChange, 1000)}
            />
          </div>
          <div className={style.timeSift}>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="start"
                type="datetime-local"
                // defaultValue={`${new Date().toISOString().split('.')[0]}`}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <br />
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="end"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        </div>
        <div className={style.showList}>
          {fileEntity.map((item, index) => (
            <div key={index} className={style.listItem}>
              <div className={style.listContent}>{item}</div>
              <br />
              <br />
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

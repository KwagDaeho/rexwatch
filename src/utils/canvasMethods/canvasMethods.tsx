import axios from 'axios';
import html2canvas from 'html2canvas';
import { mutate } from 'swr';

export const zoomIn = () => {
  const zoomTarget = document.getElementById('canvas_zoom');
  const beforeScale = Number(
    zoomTarget.style.transform.replace('scale(', '').replace(')', ''),
  );
  const afterScale = beforeScale + 0.1;
  if (afterScale < 2) {
    zoomTarget.style.transform = 'scale(' + afterScale + ')';
    zoomTarget.style.left = ((afterScale - 1) / 2) * 100 + '%';
    zoomTarget.style.top = ((afterScale - 1) / 2) * 100 + '%';
  }
};
export const zoomOut = () => {
  const zoomTarget = document.getElementById('canvas_zoom');
  const beforeScale = Number(
    zoomTarget.style.transform.replace('scale(', '').replace(')', ''),
  );
  const afterScale = beforeScale - 0.1;
  if (afterScale > 0.5) {
    zoomTarget.style.transform = 'scale(' + afterScale + ')';
    if (afterScale >= 1) {
      zoomTarget.style.left = ((afterScale - 1) / 2) * 100 + '%';
      zoomTarget.style.top = ((afterScale - 1) / 2) * 100 + '%';
    }
  }
};
export const zoomDefault = () => {
  const zoomTarget = document.getElementById('canvas_zoom');
  zoomTarget.style.transform = 'scale(1.0)';
  zoomTarget.style.left = '0';
  zoomTarget.style.top = '0';
};
export const closeModal = (setSelectedIndex) => {
  setSelectedIndex(0);
};

export const handleSave = (areaData, setDrawMode) => {
  async function saveData() {
    try {
      await axios.post('http://192.168.0.200:8080/query', {
        Command: 302,
        Channel: 1,
        ROIs: areaData.ROIs,
      });
    } catch (e) {
      console.error(e);
    }
  }
  if (confirm('변경된 내용(영역 정보)을 저장하시겠습니까?')) {
    setDrawMode(0);
    alert('확인(예)을 누르셨습니다.\n선택한 영역정보를 저장 합니다.');
    saveData();
  } else {
    alert('취소(아니오)를 누르셨습니다.\n영억정보를 저장하지 않습니다.');
  }
};

HTMLCanvasElement.prototype.getContext = (function (origFn) {
  return function (type, attribs) {
    attribs = attribs || {};
    attribs.preserveDrawingBuffer = true;
    return origFn.call(this, type, attribs);
  };
})(HTMLCanvasElement.prototype.getContext);
export const handlePause = () => {
  html2canvas(document.querySelector('#detection_video'))
    .then((canvas) => {
      const $target = document.querySelector('#screenshot');
      if ($target.hasChildNodes()) {
        $target.removeChild($target.lastElementChild);
      } else {
        $target.appendChild(canvas);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleReset = (setDrawMode) => {
  setDrawMode(0);
  mutate('http://192.168.0.200:8080/query');
};

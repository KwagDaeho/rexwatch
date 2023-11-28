import AddDrawCanvas from "src/utils/DrawCanvas/AddDrawCanvas/page";
import EditDrawCanvas from "src/utils/DrawCanvas/EditDrawCanvas/page";

function DetectionArea() {
  return (
    <>
      <div>검지영역.. 필요한 것</div>
      <ul>
        <li>실시간 CCTV 영상</li>
        <li>검지영역 데이터 CRUD</li>
        <li>검지영역 '그리기'</li>
      </ul>
      <hr style={{marginBlock: '20px'}}/>
      <div style={{display:"flex"}}>
      <AddDrawCanvas />
      <EditDrawCanvas />
      </div>
      
    </>
  );
}

export default DetectionArea;

// import { sendRequest } from "@/api/PostApi";

// export const handleDeleteClick = () => {
// 	if (window.confirm('삭제하시겠습니까?')) {
// 		const fetchData = async () => {
// 			const data = {
// 				Command: 4,
// 				Channel: initialClickedData.Channel,
// 				Operation: 3, //삭제
// 				LicenseKey: initialClickedData.LicenseKey,
// 				CameraID: initialClickedData.CameraID,
// 				Name: initialClickedData.Name,
// 				IP: initialClickedData.IP,
// 				URL: initialClickedData.RtspUri,
// 			}; // 101로 나중에 변경?
// 			await sendRequest(data);
// 		};
// 		fetchData();
// 		window.alert('삭제되었습니다.');
// 		setModalOpen((prevState) => ({ ...prevState, editModal: false }));
// 	} else {
// 		return;
// 	}
// };

// export const handleEditClick = () => {
// 	if (window.confirm('수정하시겠습니까?')) {
// 		const fetchData = async () => {
// 			const data = {
// 				Command: 4,
// 				Channel: clickedItemData.Channel,
// 				Operation: 2, //변경
// 				LicenseKey: clickedItemData.LicenseKey,
// 				CameraID: clickedItemData.CameraID,
// 				Name: clickedItemData.Name,
// 				IP: clickedItemData.IP,
// 				URL: clickedItemData.RtspUri,
// 			}; // 101로 나중에 변경?
// 			await sendRequest(data);
// 		};

// 		fetchData();
// 		window.alert('변경되었습니다.');
// 		setModalOpen((prevState) => ({ ...prevState, editModal: false }));
// 	} else {
// 		return;
// 	}
// };

// export const handleCameraRegisterClick = () => {
// 	if (window.confirm('등록하시겠습니까?')) {
// 		const fetchData = async () => {
// 			const data = {
// 				Command: 4,
// 				Channel: clickedItemData.Channel,
// 				Operation: 1, // 등록
// 				LicenseKey: clickedItemData.LicenseKey,
// 				CameraID: clickedItemData.CameraID,
// 				Name: clickedItemData.Name,
// 				IP: clickedItemData.IP,
// 				URL: clickedItemData.RtspUri,
// 			}; // 101로 나중에 변경?
// 			await sendRequest(data);
// 		};
// 		fetchData();
// 		window.alert('등록되었습니다.');
// 		setModalOpen((prevState) => ({ ...prevState, editModal: false }));
// 	} else {
// 		return;
// 	}
// };
// export const handleCameraSettingSaveClick = () => {
// 	if (window.confirm('등록하시겠습니까?')) {
// 		const fetchData = async () => {
// 			const data = {
// 				Command: 4,
// 				Channel: clickedItemData.Channel,
// 				Operation: 1, // 등록
// 				LicenseKey: clickedItemData.LicenseKey,
// 				CameraID: clickedItemData.CameraID,
// 				Name: clickedItemData.Name,
// 				IP: clickedItemData.IP,
// 				URL: clickedItemData.RtspUri,
// 			}; // 101로 나중에 변경?
// 			await sendRequest(data);
// 		};
// 		fetchData();
// 		window.alert('등록되었습니다.');
// 		setModalOpen((prevState) => ({ ...prevState, editModal: false }));
// 	} else {
// 		return;
// 	}
// };

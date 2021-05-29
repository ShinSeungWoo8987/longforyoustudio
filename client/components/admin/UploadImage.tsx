import React, { useState } from 'react';
import styled from 'styled-components';
import { DisplayButton, ImgStyle, onepxToRem, Title } from '../../styles/globals';
import Head from 'next/head';
import axios from 'axios';

interface FilePreview {
  file: File | null;
  previewURL: string | null;
}

const UploadImage: React.FC = () => {
  const [display, setDisplay] = useState(false);

  // const { login } = useSelector((state: AppState) => state.loginReducer);
  // const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [type, setType] = useState('profile1');

  const [thumbnail, setThumbnail] = useState<undefined | null | FileList>();
  const [thumbnailPrev, setThumbnailPrev] = useState<null | FilePreview>();

  const [profiles, setProfiles] = useState<undefined | null | FileList>();
  const [profilesPrev, setProfilesPrev] = useState<null | FilePreview[]>();

  const thumbnailRef = React.useRef<HTMLInputElement>(null);
  const handleThumbnailUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => thumbnailRef.current?.click();
  const profilesRef = React.useRef<HTMLInputElement>(null);
  const handleProfilesUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => profilesRef.current?.click();

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    let file = e.target.files;
    reader.onloadend = () => {
      setThumbnailPrev({
        file: file ? file[0] : null,
        previewURL: String(reader.result),
      });
    };
    if (file) reader.readAsDataURL(file[0]);
    setThumbnail(e.target.files);
  };
  const handleProfiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newFileList: FilePreview[] = [];

    const uploadedFiles = e.target.files;

    if (uploadedFiles) {
      for (var i = 0; i < uploadedFiles.length; i++) {
        let reader = new FileReader();
        let file = uploadedFiles[i];
        reader.onloadend = () => {
          newFileList.push({
            file: file,
            previewURL: String(reader.result),
          });
        };
        reader.readAsDataURL(file);
      }
    }
    setProfilesPrev(newFileList);
    setProfiles(e.target.files);
  };

  /////////////////////////////////////
  const insertProfile = (type: string, thumbnail: File | undefined, profiles?: FileList | undefined) => {
    const formData = new FormData();
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    formData.append('type', type);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
      if (profiles) {
        for (var i = 0; i < profiles?.length; i++) {
          formData.append('profile' + i, profiles[i]);
        }
      }
    }

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + `/profile`, formData, config)
      .then(async (res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  /////////////////////////////////////

  const uploadProfile = () => {
    if (thumbnail) insertProfile(type, thumbnail[0], profiles!);
    setThumbnail(undefined);
    setProfiles(undefined);
    setThumbnailPrev(null);
    setProfilesPrev(null);
  };

  const handleDisplay = () => {
    setDisplay(false);
  };

  const hadleSelectBox = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);

  return (
    <>
      <Head>
        <title>LongForYou Studio</title>
      </Head>

      <Container>
        <Title>Upload Image</Title>

        {display && (
          <>
            <UploadImageButton onClick={handleThumbnailUpload}>썸네일 선택</UploadImageButton>
            <input type="file" ref={thumbnailRef} onChange={handleThumbnail} style={{ display: 'none' }} />

            {thumbnailPrev?.previewURL && (
              <img
                key={thumbnailPrev?.previewURL}
                className="preview"
                src={thumbnailPrev?.previewURL}
                style={ImgStyle}
                alt="thumbnailPrev"
              />
            )}

            {/* <hr />
              <button className="upload_btn" onClick={handleProfilesUpload}>
                이미지 선택
              </button>
              <input type="file" multiple ref={profilesRef} onChange={handleProfiles} style={{ display: 'none' }} />

              <button onClick={() => setRefresh(!refresh)}>이미지 새로고침</button>

              {profilesPrev &&
                profilesPrev.map((image) => (
                  <img
                    key={thumbnailPrev!.previewURL}
                    className="preview"
                    src={image!.previewURL!}
                    alt="thumbnailPrev"
                  />
                ))}
              <hr />

              <select onChange={hadleSelectBox}>
                <option value="profile1">profile1</option>
                <option value="profile2">profile2</option>
              </select> */}

            {thumbnailPrev?.previewURL && <SubmitButton onClick={uploadProfile}>업로드</SubmitButton>}
          </>
        )}

        <DisplayButton onClick={() => setDisplay(!display)}>{display ? '∧' : '∨'}</DisplayButton>
      </Container>
    </>
  );
};

export default UploadImage;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const UploadImageButton = styled.button`
  display: block;
  height: ${46 * onepxToRem}rem;
  width: ${146 * onepxToRem}rem;
  margin: ${12 * onepxToRem}rem auto;
  font-size: ${20 * onepxToRem}rem;

  border: none;
  border-radius: 5px;
  background-color: #87d37c;
`;

const SubmitButton = styled(UploadImageButton)`
  background-color: #aa9ae7;
`;

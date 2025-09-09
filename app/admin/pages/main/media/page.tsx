"use client"

import AdminPgTop from "@/app/admin/components/card/AdminPgTop"
import AdminBox from "@/app/admin/components/card/AdminBox"
import { InputFile, InputText } from "@/app/components/form/Input"
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HTTPMETHOD } from "@/lib/util/callApi";
import { getAccessToken } from "@/lib/util/tokenClass";
import { callAPI } from "@/lib/util/callApi";
interface IMainMedia {
    index: number,
    video_link: string,
    new_main_img01_kr_thumb_black?: string,
    new_main_img01_kr_big_black?: string,
    new_main_img02_kr_black?: string,
    new_main_img01_kr_thumb_light?: string,
    new_main_img01_kr_big_light?: string,
    new_main_img02_kr_light?: string,

    main_img01_kr_thumb_black?: string,
    main_img01_kr_thumb_black_name?: string,
    main_img01_kr_big_black?: string,
    main_img01_kr_big_black_name?: string,
    main_img02_kr_black?: string,
    main_img02_kr_black_name?: string,
    main_img01_kr_thumb_light?: string,
    main_img01_kr_thumb_light_name?: string,
    main_img01_kr_big_light?: string,
    main_img01_kr_big_light_name?: string,
    main_img02_kr_light?: string,
    main_img02_kr_light_name?: string,
    
}

export default function AdminPageMain() {

    const router = useRouter();

    const handleViewValue = (e: any) => {
        const newValue = e.target.value;
        setDataMainMedia((prev:any) => {
            return {...prev, [e.target.name]: newValue};
        });
    }

    const [dataMainMedia, setDataMainMedia] = useState<any>(null);

    const getMainMedia = async () => {
        const url = `/api/admin/mgmt/main`;
        const token = getAccessToken();
        if (token === "") {
            alert("로그인 해주세요.");
            return;
        }

        try {
            const result : {data: IMainMedia} = await callAPI(HTTPMETHOD.GET, {}, url, token);
            const data = result.data;
            setDataMainMedia(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMainMedia()

    }, [])
    
    const patchMainMedia = async (event: FormEvent) => {

        event.preventDefault();

        const formData = new FormData();
        formData.append("link", dataMainMedia?.video_link?.substring(0, 9999) ?? '');
        dataMainMedia.new_main_img01_kr_thumb_light && formData.append("main_img01_kr_thumb_light", dataMainMedia.new_main_img01_kr_thumb_light);
        dataMainMedia.new_main_img01_kr_thumb_black && formData.append("main_img01_kr_thumb_black", dataMainMedia.new_main_img01_kr_thumb_black);
        dataMainMedia.new_main_img01_kr_big_light && formData.append("main_img01_kr_big_light", dataMainMedia.new_main_img01_kr_big_light);
        dataMainMedia.new_main_img01_kr_big_black && formData.append("main_img01_kr_big_black", dataMainMedia.new_main_img01_kr_big_black);
        dataMainMedia.new_main_img02_kr_light && formData.append("main_img02_kr_light", dataMainMedia.new_main_img02_kr_light);
        dataMainMedia.new_main_img02_kr_black && formData.append("main_img02_kr_black", dataMainMedia.new_main_img02_kr_black);

        const token = getAccessToken();
        if (token === "") {
            alert("로그인 해주세요.");
            return
        }

        try {
            const result = await callAPI(HTTPMETHOD.PATCH, formData, "/api/admin/mgmt/main", token);
            alert("수정 되었습니다.");

            router.push("/admin/pages/main/media");

        } catch (e: any) {
            alert("처리 중 문제가 발생하였습니다.\n반복될 경우, 관리자에게 문의하여 주세요.");
            console.log(e);
        }
    }

    // handle

    const handleViewImage = (e: any) => {
        if(e.target && e.target.files[0]){
            setDataMainMedia((prev:any) => {
                return {...prev, [e.target.name]: e.target.files[0]};
            });
        } else {
            setDataMainMedia((prev:any) => {
                return {...prev, [e.target.name]: null};
            });
        }
    }

    

    return (
        <div className="adm--wrap">
            <AdminPgTop tit="메인관리" />
            <AdminBox><>
            <div className="adm--box-fixed">
                    <div className="adm--box-tit">메인 이미지 수정정</div>
                    <div className="adm--box-fixed-r">
                        <div onClick={e => router.back()} className="btn disabled small radius">목록</div>
                        <div onClick={patchMainMedia} className="btn primary small radius">수정</div>
                    </div>
                </div>
                <div className="adm--box-tit">SHOP 정보</div>
                <div className="input-table">

                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>링크</p></div>
                        <div className="input-table-row-td">
                            <InputText size="xsmall" id="video_link" name="video_link" value={dataMainMedia?.video_link ?? ''} placeholder={"유튜브 링크를 입력해주세요"} onChange={e => handleViewValue(e)}></InputText>
                        </div>
                    </div>
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>youtube button img - light</p></div>
                        <div className="input-table-row-td">
                            <div className="input-table-row-td-img">
                                {
                                    dataMainMedia?.new_main_img02_kr_light 
                                    ?
                                    <img src={URL.createObjectURL(dataMainMedia?.new_main_img02_kr_light)} alt="youtube button img - light" />
                                    :
                                    dataMainMedia?.main_img02_kr_light 
                                        ?
                                        <img src={dataMainMedia?.main_img02_kr_light} alt="youtube button img - light" />
                                        :
                                        <div>이미지를 선택해주세요</div>
                                }
                            </div>
                            <InputFile
                                size="small"
                                id={`new_main_img02_kr_light`}
                                name={`new_main_img02_kr_light`}
                                orgFileName={dataMainMedia?.main_img02_kr_light_name}
                                placeholder="유튜브 버튼 img - light 이미지를 선택하세요"
                                onChange={(e) => handleViewImage(e)}
                            />
                        </div>
                    </div>
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>youtube button img - dark</p></div>
                        <div className="input-table-row-td">
                            <div className="input-table-row-td-img">
                                {
                                    dataMainMedia?.new_main_img02_kr_black 
                                    ?
                                    <img src={URL.createObjectURL(dataMainMedia?.new_main_img02_kr_black)} alt="youtube button img - dark" />
                                    :
                                    dataMainMedia?.main_img02_kr_black 
                                        ?
                                        <img src={dataMainMedia?.main_img02_kr_black} alt="youtube button img - dark" />
                                        :
                                        <div>이미지를 선택해주세요</div>
                                }
                            </div>
                            <InputFile
                                size="small"
                                id={`new_main_img02_kr_black`}
                                name={`new_main_img02_kr_black`}
                                orgFileName={dataMainMedia?.main_img02_kr_black_name}
                                placeholder="유튜브 버튼 img - dark 이미지를 선택하세요"
                                onChange={(e) => handleViewImage(e)}
                            />
                        </div>
                    </div>

                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>Left Top thumb img - light</p></div>
                        <div className="input-table-row-td">
                            <div className="input-table-row-td-img">
                                {
                                    dataMainMedia?.new_main_img01_kr_thumb_light 
                                    ?
                                    <img src={URL.createObjectURL(dataMainMedia?.new_main_img01_kr_thumb_light)} alt="SHOP 이미지" />
                                    :
                                    dataMainMedia?.main_img01_kr_thumb_light 
                                        ?
                                        <img src={dataMainMedia?.main_img01_kr_thumb_light} alt="SHOP 이미지" />
                                        :
                                        <div>이미지를 선택해주세요</div>
                                }
                            </div>
                            <InputFile
                                size="small"
                                id={`new_main_img01_kr_thumb_light`}
                                name={`new_main_img01_kr_thumb_light`}
                                orgFileName={dataMainMedia?.main_img01_kr_thumb_light_name}
                                placeholder="Left Top 버튼 img - light 이미지를 선택하세요"
                                onChange={(e) => handleViewImage(e)}
                            />
                        </div>
                    </div>
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>Left Top thumb img - dark</p></div>
                        <div className="input-table-row-td">
                            <div className="input-table-row-td-img">
                                {
                                    dataMainMedia?.new_main_img01_kr_thumb_black 
                                    ?
                                    <img src={URL.createObjectURL(dataMainMedia?.new_main_img01_kr_thumb_black)} alt="Left Top thumb img - dark" />
                                    :
                                    dataMainMedia?.main_img01_kr_thumb_black 
                                        ?
                                        <img src={dataMainMedia?.main_img01_kr_thumb_black} alt="Left Top thumb img - dark" />
                                        :
                                        <div>이미지를 선택해주세요</div>
                                }
                            </div>
                            <InputFile
                                size="small"
                                id={`new_main_img01_kr_thumb_black`}
                                name={`new_main_img01_kr_thumb_black`}
                                orgFileName={dataMainMedia?.main_img01_kr_thumb_black_name}
                                placeholder="Left Top 버튼 img - dark 이미지를 선택하세요"
                                onChange={(e) => handleViewImage(e)}
                            />
                        </div>
                    </div>

                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>Left Top big img - light</p></div>
                        <div className="input-table-row-td">
                            <div className="input-table-row-td-img">
                                {
                                    dataMainMedia?.new_main_img01_kr_big_light 
                                    ?
                                    <img src={URL.createObjectURL(dataMainMedia?.new_main_img01_kr_big_light)} alt="Left Top big img - light" />
                                    :
                                    dataMainMedia?.main_img01_kr_big_light 
                                        ?
                                        <img src={dataMainMedia?.main_img01_kr_big_light} alt="Left Top big img - light" />
                                        :
                                        <div>이미지를 선택해주세요</div>
                                }
                            </div>
                            <InputFile
                                size="small"
                                id={`new_main_img01_kr_big_light`}
                                name={`new_main_img01_kr_big_light`}
                                orgFileName={dataMainMedia?.main_img01_kr_big_light_name}
                                placeholder="Left Top big img - light 이미지를 선택하세요"
                                onChange={(e) => handleViewImage(e)}
                            />
                        </div>
                    </div>
                    <div className="input-table-row" data-grid="1">
                        <div className="input-table-row-th"><p>Left Top big img - dark</p></div>
                        <div className="input-table-row-td">
                            <div className="input-table-row-td-img">
                                {
                                    dataMainMedia?.new_main_img01_kr_big_black 
                                    ?
                                    <img src={URL.createObjectURL(dataMainMedia?.new_main_img01_kr_big_black)} alt="Left Top big img - dark" />
                                    :
                                    dataMainMedia?.main_img01_kr_big_black 
                                        ?
                                        <img src={dataMainMedia?.main_img01_kr_big_black} alt="Left Top big img - dark" />
                                        :
                                        <div>이미지를 선택해주세요</div>
                                }
                            </div>
                            <InputFile
                                size="small"
                                id={`new_main_img01_kr_big_black`}
                                name={`new_main_img01_kr_big_black`}
                                orgFileName={dataMainMedia?.main_img01_kr_big_black_name}
                                placeholder="Left Top big img - dark 이미지를 선택하세요"
                                onChange={(e) => handleViewImage(e)}
                            />
                        </div>
                    </div>
                    

                </div>

            </></AdminBox>
        </div>
    ) 
}
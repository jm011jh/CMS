"use client";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import viewDataImageFileOneUploadToS3 from "@/app/admin/lib/viewDataFilesUpload";
import htmlEditButton from "quill-html-edit-button";

interface Props {
    initContent: string,
    setContent: Dispatch<SetStateAction<string>>,
    width?: string,
    height?: string,
    attachImageModule?: boolean,
}

export const CustomEditor = ({ initContent, setContent, width, height, attachImageModule = false }: Props) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    // const [content, setContent] = useState("");

    useEffect(() => {
        if (editorRef.current && !quill) {

            Quill.register('modules/htmlEditButton', htmlEditButton);

            const q = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    // toolbar: [
                    //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    //     [{ size: ["small", false, "large", "huge"] }],
                    //     ["bold", "italic", "underline", 'strike'],
                    //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                    //     [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                    //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    //     ['clean'],
                    //     ['customeImage']
                    // ],
                    toolbar: {
                        container: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ size: ["small", false, "large", "huge"] }],
                            ["bold", "italic", "underline", 'strike'],
                            [{ 'align': [] }], // align options
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            ...(attachImageModule ? [['customImage']] : []), // 조건부로 이미지 버튼 추가
                            ['clean']
                        ],
                        handlers: {
                            customImage: () => {
                                const input = document.getElementById("input_file") as HTMLInputElement || document.createElement("input");
                                input.click();
                                input.onchange = async () => {
                                    const file = input.files?.[0];
                                    if (file) {
                                        // 여기에 이미지 업로드 로직을 추가해야 합니다.
                                        const result: any = await viewDataImageFileOneUploadToS3(file, 'notice/img');

                                        console.log('Image upload result:', result);

                                        q.root.innerHTML += `<img src="${result.fileUrl}" />`;

                                        // // Base64 방식
                                        // const reader = new FileReader();
                                        // reader.onload = () => {
                                        //     // q.root.innerHTML += `<img src="${reader.result}" alt="Uploaded Image" />`;
                                        //     q.root.innerHTML += `<img src="${'https://cdn.blissoolmt.com/blissoo/qa/2025-06-26/media/img/8d6ebf13-5769-45ff-aca8-f0f22435e6b8.png'}" alt="Uploaded Image" />`;
                                        // };
                                        // reader.readAsDataURL(file);
                                    }
                                };
                            }
                        }
                    },
                    htmlEditButton: {}
                },
            });

            q.on("text-change", () => {
                setContent(q.root.innerHTML);
            });

            // 초기값 세팅
            q.root.innerHTML = initContent;

            // 👉 Quill이 렌더링한 후에 버튼 내부를 조작
            const button = document.querySelector('.ql-customImage');
            if (button) {
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                </svg>`;
            }

            setQuill(q);
        }
    }, [editorRef, quill]);

    return (
        <div
            style={{
                all: "unset", // 부모 CSS 차단
                width: '100%',
            }}
        >
            <div ref={editorRef} style={{ height: height, width: width }} />
            {/* <div style={{ marginTop: 20 }}>
                <h4>현재 HTML 내용</h4>
                <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
            </div> */}

            <input id="input_file" style={{ display: 'none' }} type="file" accept="image/*" />
        </div>
    );
}
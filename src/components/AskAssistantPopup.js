import React, { useEffect, useState } from "react";
import { FaPlus, FaPencilAlt } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import { IoMdSend } from "react-icons/io";
import { SiGoogleassistant } from "react-icons/si";
import { toast } from "react-toastify";
import PopupContainer from "./PopupContainer";
import PillButton from "./input/PillButton";
import TextBox from "./input/TextBox";
import SelectBox from "./input/SelectBox";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config"

const AskAssistantPopup = ({
    isOpen = false,
    tables = [],
    columns = [],
    devices = [],
    analyticTypes = [],
    closeFunction = () => { },
}) => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(0); // 0 - no any, 1 - success, 2 - error, 3 - loading
    const [caption, setCaption] = useState('Average Temperature');
    const [dataset, setDataset] = useState('tbl_data');
    const [parameter, setParameter] = useState('temperature');
    const [device, setDevice] = useState('IT Department');
    const [analyticType, setAnalyticType] = useState('Average');
    const [value, setValue] = useState('25.45');
    const [timestamp, setTimestamp] = useState('2021-01-01 00:00:00');

    const handleSubmit = () => {
        if (prompt == '') {
            toast.error('Please ask a question');
            return;
        }

        sendPrompt(prompt);
    }

    const sendPrompt = async (prompt) => {
        console.log(tables, columns, analyticTypes)

        let tablesString = '', columnsString = '', devicesString = '', analyticTypesString = '';
        for (let tableItem of tables) {
            tablesString += `'${tableItem.tbl_name}',`;
        }
        for (let columnItem of columns) {
            columnsString += `'${columnItem.clm_name}',`;
        }
        for (let deviceItem of devices) {
            devicesString += `'${deviceItem.device_name}',`;
        }
        for (let analyticType of analyticTypes) {
            analyticTypesString += `'${analyticType.name}',`;
        }

        let systemPrompt = `tables: [${tablesString}] columns: [${columnsString}] devices: [${devicesString}] analyticTypes: [${analyticTypesString}]`;
        let assistantPrompt = 'Refer system content. Give JSON object for {caption (suitable small caption from user prompt), dataset (select from tables referring to user prompt by tbl_name), parameter(select from columns referring to user prompt by clm_name), device(select from devices referring to devices bydevice_name), analyticType (select from analyticTypes)} for the user prompt. Only return the JSON object. Not any word else.'
        setResult(3);
        try {
            const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: systemPrompt },
                { role: "user", content: prompt },
                { role: "assistant", content: assistantPrompt }
                ],
                model: "gpt-3.5-turbo",
            });

            console.log(completion.choices[0].message.content);

            let response = completion.choices[0].message.content;

            //parse response to a JSON object
            let responseJSON = JSON.parse(response);
            console.log(responseJSON);
            if (responseJSON.caption == '' || responseJSON.dataset == '' || responseJSON.parameter == '' || responseJSON.device == '' || responseJSON.analyticType == '') {
                setResult(2);
                clearValues();
                setPrompt('');
                return;
            }
            // Check for 'undefined'
            if (responseJSON.caption == 'undefined' || responseJSON.dataset == 'undefined' || responseJSON.parameter == 'undefined' || responseJSON.device == 'undefined' || responseJSON.analyticType == 'undefined') {
                setResult(2);
                clearValues();
                setPrompt('');
                return;
            }
            setCaption(responseJSON.caption);
            let datasetID = tables.find(item => item.tbl_name == responseJSON.dataset).tbl_id;
            let parameterID = columns.find(item => item.clm_name == responseJSON.parameter).clm_id;
            let deviceID = devices.find(item => item.device_name == responseJSON.device).device_id;
            let analyticTypeID = analyticTypes.find(item => item.name == responseJSON.analyticType).id;
            if (datasetID == undefined || parameterID == undefined || deviceID == undefined || analyticTypeID == undefined) {
                setResult(2);
                clearValues();
                setPrompt('');
                return;
            }
            setDataset(datasetID);
            setParameter(responseJSON.parameter); // Parameter name is directly needed for table queries
            setDevice(deviceID);
            setAnalyticType(analyticTypeID);

            processAnalytics(responseJSON);
        } catch (err) {
            setResult(2);
            clearValues();
            setPrompt('');
            console.log(err);
        }
    }

    const processAnalytics = (data) => {
        //get the data from the database
        //set the value and timestamp
        //for now, set some random values
        setValue(Math.floor(Math.random() * 100) + 1);
        setTimestamp(new Date().toISOString());
        setResult(1);
        //setPrompt('');
    }

    const clearValues = () => {
        setPrompt('');
        setCaption('');
        setDataset('');
        setParameter('');
        setDevice('');
        setAnalyticType('');
        setValue('');
        setTimestamp('');
    }

    return (
        <PopupContainer
            isOpen={isOpen}
            closeFunction={closeFunction}
            onClose={() => { }}
            title={'DataCanvas Assistant'}
            Icon={SiGoogleassistant}
            closeIconVisible={true}>
            <div className="flex flex-col space-y-5 mt-4">
                {result == 0 ? (
                    <div className="w-full py-4 flex flex-col justify-center items-center">
                        <img src={process.env.PUBLIC_URL + '/anim/chat.gif'} alt="chart" className="w-[60px] h-[60px] object-cover mb-1" />
                        <div className="text-green text-lg font-semibold">Everything At Ease</div>
                        <div className="text-gray1 mt-2 text-sm text-center">
                            Try asking, 'What is the average temperature of IT Department from SensorData?'
                        </div>
                    </div>
                ) : (result == 1) ? (
                    <div className="w-full py-4 flex flex-col justify-center items-center">
                        <div className="text-white text-lg font-semibold">{caption}</div>
                        <div className="flex flex-wrap w-full mt-2 justify-center items-center">
                            <div className="border border-green rounded-full px-4 py-1 text-xs text-green mx-2 my-1">
                                {tables.find(item => item.tbl_id == dataset)?.tbl_name || ''}
                            </div>
                            <div className="border border-green rounded-full px-4 py-1 text-xs text-green mx-2 my-1">
                                {parameter}
                            </div>
                            <div className="border border-green rounded-full px-4 py-1 text-xs text-green mx-2 my-1">
                                {devices.find(item => item.device_id == device)?.device_name || ''}
                            </div>
                            <div className="border border-green rounded-full px-4 py-1 text-xs text-green mx-2 my-1">
                                {analyticTypes.find(item => item.id == analyticType)?.name || ''}
                            </div>
                        </div>
                        <div className="w-full border border-gray1 border-opacity-20 mt-3" />
                        <div className="w-full text-center text-gray1 text-xs mt-4">
                            Value
                        </div>
                        <div className="w-full flex justify-center items-center text-3xl text-white font-semibold">
                            {value}
                        </div>
                        <div className="w-full text-center text-gray1 text-sm mt-4">
                            Last Update: {timestamp.replace("T", " ").replace("Z", " ").substring(0, 19)}
                        </div>
                    </div>
                ) : (result == 2) ? (
                    <div className="w-full py-4 flex flex-col justify-center items-center">
                        <img src={process.env.PUBLIC_URL + '/anim/error.gif'} alt="chart" className="w-[60px] h-[60px] object-cover mb-1" />
                        <div className="text-green text-lg font-semibold">That didn't went well</div>
                        <div className="text-gray1 mt-2 text-sm text-center">
                            Try asking something different
                        </div>
                    </div>
                ) : (
                    <div className="w-full py-4 flex flex-col justify-center items-center">
                        <ScaleLoader color={'#3ECF8E'} loading={true} height={30} width={4} />
                        <div className="text-green text-lg font-semibold mt-2">Processing your request</div>
                    </div>
                )}

                <TextBox
                    placeholder="Ask a question"
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                />
                <div className="w-full flex justify-center items-center">
                    <PillButton text="Continue" icon={IoMdSend} onClick={() => handleSubmit()} />
                </div>

            </div>
        </PopupContainer>
    )
}

export default AskAssistantPopup;
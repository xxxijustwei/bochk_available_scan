import axios from "axios";

export const districts = [
    { code: "_central_western_district", name: "中西区" },
    { code: "_eastern_district", name: "东区" },
    { code: "_island_district", name: "离岛区" },
    { code: "_kowloon_city_district", name: "九龙城区" },
    { code: "_kwai_tsing_district", name: "葵青区" },
    { code: "_kwun_tong_district", name: "观塘区" },
    { code: "_north_district", name: "北区" },
    { code: "_sai_kung_district", name: "西贡区" },
    { code: "_sha_tin_district", name: "沙田区" },
    { code: "_sham_shui_po_district", name: "深水埗区" },
    { code: "_southern_district", name: "南区" },
    { code: "_tai_po_district", name: "大埔区" },
    { code: "_tsuen_wan_district", name: "荃湾区" },
    { code: "_tuen_mun_district", name: "屯门区" },
    { code: "_wan_chai_district", name: "湾仔区" },
    { code: "_wong_tai_sin_district", name: "黄大仙区" },
    { code: "_yau_tsim_mong_district", name: "油尖旺区" },
    { code: "_yuen_long_district", name: "元朗区" }
];
export const times = [
    { code: "P01", time: "09:00" },
    { code: "P02", time: "09:45" },
    { code: "P03", time: "10:30" },
    { code: "P04", time: "11:15" },
    { code: "P05", time: "14:00" },
    { code: "P06", time: "14:45" },
    { code: "P07", time: "15:30" },
    { code: "P08", time: "16:15" }
];

export const getTimeName = (code: string) => {
    return times.find(item => item.code === code)?.time;
}

export const getDistrictName = (code: string) => {
    return districts.find(item => item.code === code)?.name;
}

axios.defaults.baseURL = "https://transaction.bochk.com";

export const postReq = async (path: string, data: FormData) => {
    try {
        const res = await axios.post(path, data);
        return res.data;
    } catch (ignore) { }
}
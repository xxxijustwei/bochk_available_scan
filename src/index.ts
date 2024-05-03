import dayjs from "dayjs";
import { districts, getDistrictName, getTimeName, postReq, times } from "./config"

interface Form {
    date: string;
    time: string;
    district: string;
}

const PATH = "/whk/form/openAccount/jsonAvailableBrsByDT.action";

const scan = async (requests: Form[]) => {
    const len = requests.length;

    const available: any = [];
    for (const index in requests) {
        const item = requests[index];
        const data = buildData(item);
        const timeName = getTimeName(item.time);
        const districtName = getDistrictName(item.district);

        const result = await postReq(PATH, data);
        console.log(`[${index}/${len}] ${item.date} - ${timeName} - ${districtName} | ${result.length === 1 ? "UNAVAILABLE" : "AVAILABLE"}`);

        if (result.length === 1) continue;

        const banks = result.slice(1).map((s: any) => s.messageCn);
        available.push({
            date: item.date,
            time: timeName || "",
            district: districtName || "",
            banks
        });
    }

    console.log(available);
}

const initDatetime = (data: string[]) => {
    const result: Form[] = [];
    for (const t of data) {
        for (const district of districts) {
            for (const time of times) {
                result.push({ date: t, time: time.code, district: district.code });
            }
        }
    }
    return result;
}

const getNext7DaysRequestData = () => {
    const data: string[] = [];
    const now = dayjs();
    for (let i = 0; i < 8; i++) {
        const date = now.add(i, "day");
        if (date.day() === 0) continue;
        const formatDate = now.add(i, "day").format("DD/MM/YYYY");
        data.push(formatDate);
    }
    return initDatetime(data);
}

const buildData = ({ date, time, district }: Form) => {
    const data = new FormData();

    data.append("bean.appDate", date);
    data.append("bean.appTime", time);
    data.append("bean.district", district);
    data.append("bean.precondition", "D");

    return data;
}

const test = async () => {
    const result = await postReq(PATH, buildData({
        date: "06/05/2024",
        time: "P08",
        district: "_sai_kung_district"
    }));
    console.log(result);
}

// scan(initDatetime(["11/05/2024"]));
scan(getNext7DaysRequestData());
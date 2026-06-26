const STORAGE_KEY = "dnr-media-report-records-v1";
const REMOTE_API_URL = globalThis.DNR_REMOTE_API_URL || "https://script.google.com/a/macros/dnr.ac.th/s/AKfycbzVVvw3DzkP2Wj7bJONQCSIbVXNoAVcYYDl6FuiOLCWrDynKKoNSQrYtCq8zEQ-W43k/exec";
const REMOTE_API_TIMEOUT_MS = 20000;

const sourceRows = [
  ["6 มิ.ย.", "Banner/Artwork", "รังสรรค์", "โควตาเรียนฟรี", 6, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "โควตาเรียนฟรี", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["8 มิ.ย.", "Video/Reel", "ภาคิน", "แนะนำโรงเรียน", 1, "เสร็จ", "Youtube, Website, Facebook", "ใช้งานจริง", "", "", "SPOTแนะนำโรงเรียน.mp4", "Need Review", "", "เป็นวิดีโอ ต้องเลือกภาพนิ่งจริงก่อนใช้ในรายงาน", "NO"],
  ["", "Other", "รังสรรค์", "Sticker ห้องบอร์ดบริหาร", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "240342.jpg", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "กำหนดการค่ายผู้นำ นครศรีฯ", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "กำหนดการ_ค่ายผู้นำ-A4.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "กำหนดการค่ายแพทย์ นครศรีฯ", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "กำหนดการ_แพทย์-A4.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["9 มิ.ย.", "Photo/VDO Activity", "ภาคิน", "ถ่าย VDO Footage ครูต่างชาติ", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "วิดิโอหอพัก", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "การใช้งานระบบ DNR SIS", 7, "เสร็จ", "Line@", "ใช้งานจริง", "", "", "การใช้งาน DNR_SIS", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["10 มิ.ย.", "Website", "รังสรรค์", "Header หลักสูตร \"สอบเตรียมทหาร 4 เหล่าทัพ\" ปี70", 1, "เสร็จ", "Website", "ใช้งานจริง", "", "", "1000x250_px.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "ตารางเรียนกวดวิชา 4 เหล่าทัพ", 1, "เสร็จ", "Line@", "ใช้งานจริง", "", "", "ตารางเรียน_กวดวิชา.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["11 มิ.ย.", "Photo/VDO Activity", "ภาคิน", "ถ่ายภาพและ VDO นักเรียนฝึกพละ", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "วิดิโอฝึกกลางสนาม", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "ตารางผ่อนชำระ คอร์สกวดวิชา", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "คอร์สกวดวิชา_A4-04.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["12 มิ.ย.", "Banner/Artwork", "รังสรรค์", "น้อมรำลึก เจ้าฟ้าพัชรกิตติยาภา", 1, "เสร็จ", "Facebook, Line@", "ใช้งานจริง", "", "", "1040x1040_px.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "ภาพปกเพจดาวนายร้อย", 1, "เสร็จ", "Facebook", "กำลังดำเนินการ", "", "", "820x312_px.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Website", "รังสรรค์", "ปรับปรุงหน้า Website", 6, "เสร็จ", "Website", "ใช้งานจริง", "", "", "Website", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Content", "ชยาศิลป์", "น้อมรำลึก เจ้าฟ้าพัชรกิตติยาภา", 1, "เสร็จ", "Facebook, Line@", "ใช้งานจริง", "", "", "https://www.facebook.com/share/p/1CyiMeLrfk/", "Need Review", "", "ลิงก์/โพสต์ยังไม่ใช่ไฟล์ภาพ Drive ของแถวนี้โดยตรง", "NO"],
  ["", "Video/Reel", "รังสรรค์", "VDO แนะนำวิธีการใช้งาน DNR SIS", 5, "เสร็จ", "Line@", "ใช้งานจริง", "", "", "VDO_การใช้งาน", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["13 มิ.ย.", "Video/Reel", "ภาคิน", "แนะนำโรงเรียน", 1, "เสร็จ", "Youtube, Website, Facebook", "ใช้งานจริง", "", "", "SPOTแนะนำโรงเรียน.mp4", "Need Review", "", "เป็นวิดีโอ ต้องเลือกภาพนิ่งจริงก่อนใช้ในรายงาน", "NO"],
  ["15 มิ.ย.", "Banner/Artwork", "รังสรรค์", "วันไหว้ครู", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "พิธีไหว้ครู_69.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Video/Reel", "ภาคิน", "ติวนายสิบทหารกองประจำการ", 1, "เสร็จ", "Facebook, Tiktok", "ใช้งานจริง", "", "", "7c91c5d39d6540ccbc22f49187921e80.movk", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Photo/VDO Activity", "ภาคิน", "ติวนายสิบทหารกองประจำการ", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "ติวนายสิบ_มทบ.42", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "DNR Plan", 8, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "DNR_Plan", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Content", "ชยาศิลป์", "ติวนายสิบทหารกองประจำการ", 1, "เสร็จ", "Facebook, Tiktok", "ใช้งานจริง", "", "", "https://www.facebook.com/share/p/18vbz2VrML/", "Need Review", "", "ลิงก์/โพสต์ยังไม่ใช่ไฟล์ภาพ Drive ของแถวนี้โดยตรง", "NO"],
  ["16 มิ.ย.", "Content", "ชยาศิลป์", "DNR Plan", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "https://www.facebook.com/share/p/1HVwLusB4r/", "Need Review", "", "ลิงก์/โพสต์ยังไม่ใช่ไฟล์ภาพ Drive ของแถวนี้โดยตรง", "NO"],
  ["17 มิ.ย.", "Banner/Artwork", "รังสรรค์", "Mockup เปิดสาขานครศรีฯ ใหม่", 2, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "Mockup_สาขานครศรีฯใหม่", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["18 มิ.ย.", "Photo/VDO Activity", "ภาคิน", "ถ่ายภาพและ VDO กิจกรรมวันไหว้ครู", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "วันไหว้ครู", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Photo/VDO Activity", "ภาคิน", "แนะแนวหลักสูตร Predegree", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "Predegree", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Content", "ชยาศิลป์", "VDO กิจกรรมวันไหว้ครู", 1, "เสร็จ", "Facebook, Tiktok", "ใช้งานจริง", "", "", "วันไหว้ครู.mp4", "Need Review", "", "เป็นวิดีโอ ต้องเลือกภาพนิ่งจริงก่อนใช้ในรายงาน", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "หน้าปกแผนปฏิบัติ 69", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "A4.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Website", "รังสรรค์", "Hero รับสมัครงาน รองรับการขยาย 70", 2, "เสร็จ", "Website", "กำลังดำเนินการ", "", "", "Hero_รับสมัครงาน 2570", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Content", "ชยาศิลป์", "ภาพกิจกรรมวันไหว้ครู", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "https://www.facebook.com/share/p/17mz96H9iN/", "Need Review", "", "ลิงก์/โพสต์ยังไม่ใช่ไฟล์ภาพ Drive ของแถวนี้โดยตรง", "NO"],
  ["19 มิ.ย.", "Banner/Artwork", "รังสรรค์", "ไวนิล น้อมรำลึก เจ้าฟ้าพัชรกิตติยาภา", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "370x245.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["22 มิ.ย.", "Banner/Artwork", "รังสรรค์", "Rich Line@ แจ้งระบบ  DNR SIS", 1, "เสร็จ", "Line@", "ใช้งานจริง", "", "", "1040x1040_px.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "แจ้งผปค.ร่วมกิจกรรมค่ายผู้นำนครศรีฯ", 4, "เสร็จ", "Offline, Line@", "ใช้งานจริง", "", "", "Leader_Camp-นครศรีฯ", "Ready", "https://drive.google.com/file/d/1Tv1-wzvjedoqJwgSMy3Sc9ySL3YJEDvW/view", "ตรงกับแถวงาน 22 มิ.ย. / โฟลเดอร์ Leader_Camp-นครศรีฯ ในคอลัมน์ K / ใช้เฉพาะภาพจริงจาก Drive", "YES"],
  ["", "Banner/Artwork", "รังสรรค์", "แจ้งผปค.ร่วมกิจกรรมค่ายแพทย์นครศรีฯ", 4, "เสร็จ", "Offline, Line@", "ใช้งานจริง", "", "", "Medical_Camp-นครศรีฯ", "Ready", "https://drive.google.com/file/d/1VpBeIz_Gi6TjNUwMwsv1WVpj4hC2IOU1/view", "ตรงกับแถวงาน 22 มิ.ย. / โฟลเดอร์ Medical_Camp-นครศรีฯ ในคอลัมน์ K / ใช้เฉพาะภาพจริงจาก Drive", "YES"],
  ["", "Banner/Artwork", "รังสรรค์", "ไวนิล ป้าย กิจกรรม BB Gun", 2, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "ไวนิล_BBGun", "Ready", "https://drive.google.com/file/d/1d66irhkQ_M9ArEzzs96upTNao_Teqz9K/view", "ตรงกับแถวงาน 22 มิ.ย. / โฟลเดอร์ ไวนิล_BBGun ในคอลัมน์ K / ใช้เฉพาะภาพจริงจาก Drive", "YES"],
  ["23 มิ.ย.", "Banner/Artwork", "รังสรรค์", "แบบเสื้อกีฬาสี ดาวนายร้อย", 3, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "Mockup_เสื้อกีฬาสี", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Photo/VDO Activity", "ภาคิน", "มอบเกียรติบัตรรางวัลพานไหว้ครู", 1, "เสร็จ", "Line@", "ใช้งานจริง", "", "", "เกียร์ติบัตรวันไหว้ครู", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Banner/Artwork", "รังสรรค์", "ตารางเรียนคอร์สกวดวิชา", 1, "เสร็จ", "Offline, Line@", "ใช้งานจริง", "", "", "ตารางเรียน_กวดวิชา (1).png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["", "Brochure", "รังสรรค์", "ตารางผ่อนชำระ ค่ายเมษา-ตุลา", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "ค่ายตุลา_เมษา-A4.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["24 มิ.ย.", "Photo/VDO Activity", "ภาคิน", "ผู้บังคับกองพัน เข้าพบผู้อำนวยการ", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "กรมทหารราบที่ 5 เข้าพบผู้อำนวยการ", "Need Review", "", "เป็นชื่อโฟลเดอร์/คำค้น ต้องเลือกไฟล์ภาพจริงและใส่ URL/ID ในคอลัมน์ M", "NO"],
  ["", "Content", "ชยาศิลป์", "ผู้บังคับกองพัน เข้าพบผู้อำนวยการ", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "https://www.facebook.com/share/p/18gmXxg3v5/", "Need Review", "", "ลิงก์/โพสต์ยังไม่ใช่ไฟล์ภาพ Drive ของแถวนี้โดยตรง", "NO"],
  ["", "Brochure", "รังสรรค์", "ติวฟรีเตรียมทหาร 4 เหล่าทัพ", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "A5.png", "Need Review", "", "เป็นชื่อไฟล์ภาพ ต้องใส่ Drive File ID/URL ที่ยืนยันแล้วในคอลัมน์ M", "NO"],
  ["25 มิ.ย.", "Content", "ชยาศิลป์", "ฉีดวัคซีนไข้หวัด", 1, "เสร็จ", "Facebook", "ใช้งานจริง", "", "", "https://www.facebook.com/share/p/1BRnbmnz9G/", "Need Review", "", "ลิงก์/โพสต์ยังไม่ใช่ไฟล์ภาพ Drive ของแถวนี้โดยตรง", "NO"],
  ["", "Photo/VDO Activity", "ภาคิน", "เลือกตั้งคณะกรรมการนักเรียน", 1, "กำลังดำเนินการ", "Facebook", "รอดำเนินการ", "", "", "", "Missing Image", "", "ไม่มีรูปประกอบในคอลัมน์ K", "NO"],
  ["", "Content", "ชยาศิลป์", "เลือกตั้งคณะกรรมการนักเรียน", 1, "กำลังดำเนินการ", "Tiktok", "รอดำเนินการ", "", "", "", "Missing Image", "", "ไม่มีรูปประกอบในคอลัมน์ K", "NO"],
  ["", "Video/Reel", "ภาคิน", "แนะนำ อ.เล็ก", 1, "เสร็จ", "Offline", "ใช้งานจริง", "", "", "แนะนำบอส69.mp4", "Need Review", "", "เป็นวิดีโอ ต้องเลือกภาพนิ่งจริงก่อนใช้ในรายงาน", "NO"]
];

const fieldNames = ["date", "type", "owner", "title", "quantity", "status", "channels", "outcome", "issue", "next", "asset"];
const visibleFieldNames = fieldNames;
const visibleHeaders = ["วันที่", "ประเภทงาน", "ผู้รับผิดชอบ", "ชื่องาน", "จำนวน", "สถานะ", "ช่องทางเผยแพร่", "ผลลัพธ์", "ปัญหา /ข้อจำกัด", "แผนต่อไป", "รูปประกอบ"];
const state = {
  records: [],
  view: "overview"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function seedRecords() {
  let lastDate = "";
  return sourceRows.map((row, index) => {
    const record = Object.fromEntries(fieldNames.map((field, i) => [field, clean(row[i])]));
    if (record.date) lastDate = record.date;
    record.date = record.date || lastDate;
    record.quantity = Number(record.quantity || 0);
    record.id = `dnr-${index + 1}`;
    return record;
  }).filter(record => record.type && record.type !== "None" && record.title);
}

function clean(value) {
  return String(value ?? "").trim();
}

function visibleRecord(record, fallbackId) {
  const next = Object.fromEntries(visibleFieldNames.map(field => [field, clean(record[field])]));
  next.quantity = Number(next.quantity || 0);
  next.id = record.id || fallbackId;
  return next;
}

function hasServerBackend() {
  return Boolean(globalThis.google?.script?.run);
}

function hasRemoteBackend() {
  return !hasServerBackend() && /^https:\/\/script\.google\.com\//.test(REMOTE_API_URL);
}

function serverCall(functionName, payload) {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)[functionName](payload);
  });
}

function remoteCall(functionName, payload = {}) {
  const callbackName = `dnrJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const params = new URLSearchParams({
    api: "1",
    action: functionName,
    callback: callbackName
  });

  if (functionName === "deleteRecord") {
    params.set("id", String(payload || ""));
  } else if (payload && Object.keys(payload).length) {
    params.set("payload", JSON.stringify(payload));
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("เชื่อมต่อฐานข้อมูลออนไลน์ไม่สำเร็จ"));
    }, REMOTE_API_TIMEOUT_MS);

    function cleanup() {
      clearTimeout(timeout);
      script.remove();
      delete globalThis[callbackName];
    }

    globalThis[callbackName] = response => {
      cleanup();
      if (response?.ok) {
        resolve(response.data);
        return;
      }
      reject(new Error(response?.error || "ระบบออนไลน์ตอบกลับไม่สำเร็จ"));
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("โหลดข้อมูลออนไลน์ไม่สำเร็จ"));
    };

    script.src = `${REMOTE_API_URL}?${params.toString()}`;
    document.head.appendChild(script);
  });
}

async function backendCall(functionName, payload) {
  if (hasServerBackend()) return serverCall(functionName, payload);
  if (hasRemoteBackend()) return remoteCall(functionName, payload);
  throw new Error("ไม่พบฐานข้อมูลออนไลน์");
}

async function loadRecords() {
  if (hasServerBackend() || hasRemoteBackend()) {
    const records = await backendCall("getRecords");
    state.records = Array.isArray(records)
      ? records.map((record, index) => visibleRecord(record, `row-${index + 2}`))
      : [];
    return;
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    state.records = Array.isArray(saved)
      ? saved.map((record, index) => visibleRecord(record, `dnr-${index + 1}`))
      : seedRecords();
    saveRecords();
  } catch {
    state.records = seedRecords();
    saveRecords();
  }
}

function saveRecords() {
  if (hasServerBackend() || hasRemoteBackend()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

function uniqueValues(key) {
  return [...new Set(state.records.map(record => record[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, "th"));
}

function fillSelect(select, values, allLabel) {
  select.innerHTML = `<option value="">${allLabel}</option>` + values.map(value => `<option>${escapeHtml(value)}</option>`).join("");
}

function setupOptions() {
  fillSelect($("#typeFilter"), uniqueValues("type"), "ทุกประเภท");
  fillSelect($("#ownerFilter"), uniqueValues("owner"), "ทุกคน");
  fillSelect($("#statusFilter"), uniqueValues("status"), "ทุกสถานะ");

  const form = $("#taskForm");
  fillSelect(form.elements.type, uniqueValues("type"), "เลือกประเภท");
  fillSelect(form.elements.status, mergedValues("status", ["เสร็จ", "กำลังดำเนินการ", "รอดำเนินการ"]), "เลือกสถานะ");
  fillSelect(form.elements.outcome, mergedValues("outcome", ["ใช้งานจริง", "กำลังดำเนินการ", "รอดำเนินการ"]), "เลือกผลลัพธ์");
}

function mergedValues(key, defaults) {
  return [...new Set([...uniqueValues(key), ...defaults])];
}

function filters() {
  return {
    search: clean($("#searchInput").value).toLowerCase(),
    type: $("#typeFilter").value,
    owner: $("#ownerFilter").value,
    status: $("#statusFilter").value
  };
}

function filteredRecords() {
  const active = filters();
  return state.records.filter(record => {
    const haystack = visibleFieldNames.map(field => record[field]).join(" ").toLowerCase();
    return (!active.search || haystack.includes(active.search)) &&
      (!active.type || record.type === active.type) &&
      (!active.owner || record.owner === active.owner) &&
      (!active.status || record.status === active.status);
  });
}

function render() {
  const records = filteredRecords();
  renderMetrics(records);
  renderTypeBars(records);
  renderInsights(records);
  renderRecords(records);
  renderWeeks(records);
  renderAssets(records);
}

function renderMetrics(records) {
  const totalTasks = records.length;
  const totalPieces = sum(records, "quantity");
  const done = records.filter(record => record.status === "เสร็จ").length;
  const withAssets = records.filter(record => record.asset).length;
  const metrics = [
    ["งานทั้งหมด", totalTasks, `${totalPieces} ชิ้นงาน`],
    ["เสร็จแล้ว", done, `${percent(done, totalTasks)}% ของรายการที่กรอง`],
    ["ใช้งานจริง", records.filter(record => record.outcome === "ใช้งานจริง").length, "ผลลัพธ์พร้อมเผยแพร่"],
    ["มีรูปประกอบ", withAssets, `${percent(withAssets, totalTasks)}% ของรายการที่กรอง`]
  ];

  $("#metricGrid").innerHTML = metrics.map(([label, value, hint], index) => `
    <article class="metric-card metric-${index + 1}">
      <p>${label}</p>
      <div>
        <strong>${value}</strong>
        <span>${hint}</span>
      </div>
    </article>
  `).join("");
}

function renderTypeBars(records) {
  const counts = groupCount(records, "type", true);
  const max = Math.max(1, ...Object.values(counts));
  $("#typeBars").innerHTML = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([type, count]) => `
    <div class="bar-row">
      <span>${escapeHtml(type)}</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${(count / max) * 100}%"></div></div>
      <strong>${count}</strong>
    </div>
  `).join("") || empty("ยังไม่มีข้อมูลในตัวกรองนี้");
}

function renderInsights(records) {
  const missingAsset = records.filter(record => !record.asset);
  const pending = records.filter(record => record.status !== "เสร็จ" || record.outcome !== "ใช้งานจริง");
  const issue = records.filter(record => record.issue);
  const topOwner = Object.entries(groupCount(records, "owner")).sort((a, b) => b[1] - a[1])[0];
  const insights = [
    ["ยังไม่มีรูปประกอบ", missingAsset.length, missingAsset[0]?.title || "ไม่มีรายการขาดรูป"],
    ["มีปัญหา/ข้อจำกัด", issue.length, issue[0]?.title || "ยังไม่มีรายการที่ระบุปัญหา"],
    ["กำลังดำเนินการ", pending.length, pending[0]?.title || "ไม่มีงานค้าง"],
    ["คนที่มีงานมากสุด", topOwner ? `${topOwner[0]} (${topOwner[1]})` : "-", "นับตามรายการงาน"]
  ];

  $("#insightList").innerHTML = insights.map(([title, value, note]) => `
    <article class="insight-card">
      <strong>${escapeHtml(String(title))}: ${escapeHtml(String(value))}</strong>
      <p>${escapeHtml(String(note))}</p>
    </article>
  `).join("");
}

function renderRecords(records) {
  $("#recordCounter").textContent = `${records.length} รายการ`;
  const grid = $("#recordGrid");
  const template = $("#recordTemplate");
  grid.innerHTML = "";

  if (!records.length) {
    grid.innerHTML = empty("ไม่พบรายการที่ตรงกับตัวกรอง");
    return;
  }

  const grouped = groupRecordsByDate(records);
  grouped.forEach(({ date, items }) => {
    const group = document.createElement("section");
    group.className = "record-day-group";
    group.innerHTML = `
      <div class="record-day-head">
        <div>
          <p class="eyebrow">วันที่</p>
          <h3>${escapeHtml(date)}</h3>
        </div>
        <span class="counter">${items.length} งาน · ${sum(items, "quantity")} ชิ้น</span>
      </div>
      <div class="record-day-grid"></div>
    `;
    const dayGrid = $(".record-day-grid", group);

    items.forEach(record => {
      const card = template.content.firstElementChild.cloneNode(true);
      $(".record-date", card).textContent = record.date || "-";
      $("h3", card).textContent = record.title;
      $(".chips", card).innerHTML = [
        chip(record.type, typeClass(record.type)),
        chip(record.status, statusClass(record.status)),
        chip(record.outcome, outcomeClass(record.outcome))
      ].join("");
      $(".record-meta", card).innerHTML = metaRows([
        ["ผู้รับผิดชอบ", record.owner],
        ["จำนวน", record.quantity],
        ["ช่องทาง", record.channels],
        ["ผลลัพธ์", record.outcome]
      ]);
      $(".asset-strip", card).innerHTML = assetHtml(record);
      $(".edit-task", card).addEventListener("click", () => openTask(record.id));
      dayGrid.appendChild(card);
    });

    grid.appendChild(group);
  });
}

function groupRecordsByDate(records) {
  const groups = new Map();
  records
    .slice()
    .sort((a, b) => dateOrder(a.date) - dateOrder(b.date) || recordOrder(a.id) - recordOrder(b.id))
    .forEach(record => {
      const date = record.date || "ไม่ระบุวันที่";
      if (!groups.has(date)) groups.set(date, []);
      groups.get(date).push(record);
    });
  return [...groups.entries()].map(([date, items]) => ({ date, items }));
}

function dateOrder(date) {
  const day = Number(String(date).match(/\d+/)?.[0] || 999);
  return day;
}

function recordOrder(id) {
  return Number(String(id).match(/\d+$/)?.[0] || 9999);
}

function renderWeeks(records) {
  const weeks = {};
  records.forEach(record => {
    const key = weekLabel(record.date);
    if (!weeks[key]) weeks[key] = [];
    weeks[key].push(record);
  });

  $("#weekGrid").innerHTML = Object.entries(weeks).map(([week, items]) => `
    <article class="week-card">
      <h3>${escapeHtml(week)}</h3>
      <div class="week-stats">
        <div><span>งาน</span><strong>${items.length}</strong></div>
        <div><span>ชิ้นงาน</span><strong>${sum(items, "quantity")}</strong></div>
        <div><span>เสร็จ</span><strong>${items.filter(item => item.status === "เสร็จ").length}</strong></div>
        <div><span>มีรูป</span><strong>${items.filter(item => item.asset).length}</strong></div>
      </div>
    </article>
  `).join("") || empty("ยังไม่มีข้อมูลรายสัปดาห์");
}

function renderAssets(records) {
  const lanes = [
    ["มีรูปประกอบ", records.filter(record => record.asset)],
    ["ยังไม่มีรูปประกอบ", records.filter(record => !record.asset)]
  ];

  $("#assetBoard").innerHTML = lanes.map(([title, items]) => `
    <section class="asset-lane">
      <h3>${title} <span class="counter">${items.length}</span></h3>
      ${items.slice(0, 12).map(item => `
        <article class="asset-item">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${assetLinkHtml(item.asset, "-")}</p>
          <button class="asset-action" type="button" data-asset-id="${escapeAttr(item.id)}">${item.asset ? "แก้ไฟล์" : "แนบไฟล์"}</button>
        </article>
      `).join("") || `<p class="empty-state">ไม่มีรายการ</p>`}
    </section>
  `).join("");
}

function openTask(id) {
  const form = $("#taskForm");
  const record = state.records.find(item => item.id === id) || blankRecord();
  $("#formTitle").textContent = id ? "แก้ไขงานสื่อ" : "เพิ่มงานสื่อ";
  $("#deleteTask").style.display = id ? "inline-flex" : "none";
  fieldNames.concat("id").forEach(field => {
    if (form.elements[field]) form.elements[field].value = record[field] ?? "";
  });
  syncQuickControls();
  showTaskDialog();
  requestAnimationFrame(() => form.elements.title?.focus());
}

function blankRecord() {
  return {
    id: "",
    date: latestDate(),
    type: uniqueValues("type")[0] || "Content",
    owner: "",
    title: "",
    quantity: 1,
    status: "กำลังดำเนินการ",
    channels: "",
    outcome: "รอดำเนินการ",
    issue: "",
    next: "",
    asset: ""
  };
}

function latestDate() {
  return state.records
    .slice()
    .sort((a, b) => dateOrder(b.date) - dateOrder(a.date) || recordOrder(b.id) - recordOrder(a.id))[0]?.date || "";
}

async function upsertFromForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitter = event.submitter;
  if (submitter?.value === "cancel") return;

  try {
    const data = Object.fromEntries(new FormData(form));
    const existing = state.records.find(item => item.id === data.id) || {};
    const record = { ...existing };
    visibleFieldNames.forEach(field => {
      record[field] = clean(data[field]);
    });
    record.quantity = Number(record.quantity || 0);
    record.id = data.id || `dnr-${Date.now()}`;

    const savedRecord = hasServerBackend() || hasRemoteBackend()
      ? visibleRecord(await backendCall("saveRecord", record), record.id)
      : record;
    const index = state.records.findIndex(item => item.id === savedRecord.id);
    if (index >= 0) state.records[index] = savedRecord;
    else state.records.unshift(savedRecord);
    saveRecords();
    setupOptions();
    render();
    closeTaskDialog();
  } catch (error) {
    console.error(error);
    alert("บันทึกงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
}

async function deleteCurrentTask() {
  const id = $("#taskForm").elements.id.value;
  if (!id) return;
  try {
    if (hasServerBackend() || hasRemoteBackend()) await backendCall("deleteRecord", id);
    state.records = state.records.filter(record => record.id !== id);
    saveRecords();
    setupOptions();
    render();
    closeTaskDialog();
  } catch (error) {
    console.error(error);
    alert("ลบงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
}

function showTaskDialog() {
  const dialog = $("#taskDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeTaskDialog() {
  const dialog = $("#taskDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function openAssetDialog(id) {
  const record = state.records.find(item => item.id === id);
  if (!record) return;
  const form = $("#assetForm");
  form.elements.id.value = record.id;
  form.elements.asset.value = record.asset || "";
  $("#assetFormTitle").textContent = record.title || "แนบไฟล์ประกอบ";
  showAssetDialog();
  requestAnimationFrame(() => form.elements.asset?.focus());
}

function showAssetDialog() {
  const dialog = $("#assetDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeAssetDialog() {
  const dialog = $("#assetDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

async function saveAssetFromForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.elements.id.value;
  const record = state.records.find(item => item.id === id);
  if (!record) return;
  try {
    const asset = clean(form.elements.asset.value);
    const savedRecord = hasServerBackend() || hasRemoteBackend()
      ? visibleRecord(await backendCall("saveAsset", { id, asset }), id)
      : { ...record, asset };
    const index = state.records.findIndex(item => item.id === id);
    if (index >= 0) state.records[index] = savedRecord;
    saveRecords();
    setupOptions();
    render();
    closeAssetDialog();
  } catch (error) {
    console.error(error);
    alert("บันทึกไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
}

function clearCurrentAsset() {
  const form = $("#assetForm");
  form.elements.asset.value = "";
  form.elements.asset.focus();
}

function exportData(format) {
  const records = filteredRecords();
  const date = new Date().toISOString().slice(0, 10);
  if (format === "json") {
    const visibleRecords = records.map(record => Object.fromEntries(visibleFieldNames.map(field => [field, record[field] ?? ""])));
    download(`dnr-media-report-${date}.json`, JSON.stringify(visibleRecords, null, 2), "application/json");
    return;
  }
  const rows = records.map(record => visibleFieldNames.map(field => record[field]));
  const csv = [visibleHeaders, ...rows].map(row => row.map(csvCell).join(",")).join("\n");
  download(`dnr-media-report-${date}.csv`, csv, "text/csv;charset=utf-8");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function sum(records, key) {
  return records.reduce((total, record) => total + Number(record[key] || 0), 0);
}

function percent(value, total) {
  return total ? Math.round((value / total) * 100) : 0;
}

function groupCount(records, key, useQuantity = false) {
  return records.reduce((groups, record) => {
    const value = record[key] || "-";
    groups[value] = (groups[value] || 0) + (useQuantity ? Number(record.quantity || 0) : 1);
    return groups;
  }, {});
}

function weekLabel(date) {
  const day = Number(String(date).match(/\d+/)?.[0] || 0);
  if (day >= 6 && day <= 12) return "06 มิ.ย. - 12 มิ.ย.";
  if (day >= 13 && day <= 19) return "13 มิ.ย. - 19 มิ.ย.";
  if (day >= 22 && day <= 26) return "22 มิ.ย. - 26 มิ.ย.";
  if (day >= 27) return "27 มิ.ย. - 03 ก.ค.";
  return "ไม่ระบุสัปดาห์";
}

function statusClass(status) {
  const value = clean(status);
  if (value === "เสร็จ") return "status-done";
  if (value === "กำลังดำเนินการ") return "status-active";
  if (value === "รอดำเนินการ") return "status-waiting";
  if (value.includes("ยกเลิก") || value.includes("ปัญหา")) return "status-risk";
  return "status-neutral";
}

function outcomeClass(outcome) {
  const value = clean(outcome);
  if (value === "ใช้งานจริง") return "outcome-live";
  if (value === "กำลังดำเนินการ") return "outcome-active";
  if (value === "รอดำเนินการ") return "outcome-waiting";
  if (value.includes("แก้") || value.includes("ปัญหา")) return "outcome-risk";
  return "outcome-neutral";
}

function typeClass(type) {
  const key = clean(type).toLowerCase();
  if (key.includes("video") || key.includes("reel")) return "type-video";
  if (key.includes("content")) return "type-content";
  if (key.includes("website")) return "type-website";
  if (key.includes("photo")) return "type-photo";
  if (key.includes("brochure")) return "type-brochure";
  if (key.includes("banner") || key.includes("artwork")) return "type-art";
  return "type-other";
}

function chip(label, className = "") {
  return `<span class="chip ${className}"><span class="chip-dot" aria-hidden="true"></span>${escapeHtml(label || "-")}</span>`;
}

function metaRows(rows) {
  return rows.map(([label, value]) => `
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(String(value || "-"))}</dd>
    </div>
  `).join("");
}

function assetHtml(record) {
  const actionLabel = record.asset ? "แก้ไฟล์" : "แนบไฟล์";
  return `
    <div class="asset-line">
      <span><strong>รูปประกอบ:</strong> ${assetLinkHtml(record.asset, "ยังไม่มีรูปประกอบ")}</span>
      <button class="asset-action" type="button" data-asset-id="${escapeAttr(record.id)}">${actionLabel}</button>
    </div>
  `;
}

function assetLinkHtml(asset, emptyLabel) {
  const value = clean(asset);
  if (!value) return escapeHtml(emptyLabel);
  const href = assetHref(value);
  return `<a class="asset-link" href="${escapeAttr(href)}" target="_blank" rel="noreferrer">${escapeHtml(value)}</a>`;
}

function assetHref(asset) {
  if (/^https?:\/\//i.test(asset)) return asset;
  if (/^www\./i.test(asset)) return `https://${asset}`;
  return `https://drive.google.com/drive/search?q=${encodeURIComponent(asset)}`;
}

function empty(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function bindEvents() {
  ["searchInput", "typeFilter", "ownerFilter", "statusFilter"].forEach(id => {
    $(`#${id}`).addEventListener("input", render);
  });

  $$(".rail-nav button").forEach(button => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      $$(".rail-nav button").forEach(item => item.classList.toggle("active", item === button));
      $$(".view").forEach(view => view.classList.remove("active"));
      $(`#${state.view}View`).classList.add("active");
    });
  });

  $("#openForm").addEventListener("click", () => openTask(""));
  $("#closeForm").addEventListener("click", closeTaskDialog);
  $("#cancelForm").addEventListener("click", closeTaskDialog);
  $("#taskForm").addEventListener("submit", upsertFromForm);
  bindQuickControls();
  $("#assetForm").addEventListener("submit", saveAssetFromForm);
  $("#closeAssetForm").addEventListener("click", closeAssetDialog);
  $("#cancelAssetForm").addEventListener("click", closeAssetDialog);
  $("#clearAsset").addEventListener("click", clearCurrentAsset);
  document.addEventListener("click", event => {
    const button = event.target.closest(".asset-action[data-asset-id]");
    if (!button) return;
    openAssetDialog(button.dataset.assetId);
  });
  $("#deleteTask").addEventListener("click", deleteCurrentTask);
  $("#exportCsv").addEventListener("click", () => exportData("csv"));
  $("#exportJson").addEventListener("click", () => exportData("json"));
  $("#resetData").addEventListener("click", async () => {
    try {
      if (hasServerBackend() || hasRemoteBackend()) {
        await loadRecords();
      } else {
        state.records = seedRecords();
        saveRecords();
      }
      setupOptions();
      render();
    } catch (error) {
      console.error(error);
      alert("โหลดข้อมูลจากชีตไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  });
}

function bindQuickControls() {
  $$(".quick-row").forEach(row => {
    const target = row.dataset.target;
    const select = $("#taskForm").elements[target];
    row.addEventListener("click", event => {
      const button = event.target.closest("button[data-value]");
      if (!button || !select) return;
      select.value = button.dataset.value;
      syncQuickControls();
    });
    select?.addEventListener("change", syncQuickControls);
  });
}

function syncQuickControls() {
  const form = $("#taskForm");
  $$(".quick-row").forEach(row => {
    const value = form.elements[row.dataset.target]?.value;
    $$("button[data-value]", row).forEach(button => {
      button.classList.toggle("active", button.dataset.value === value);
    });
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (hasServerBackend() || location.protocol === "file:") return;
  navigator.serviceWorker.register("service-worker.js").catch(error => console.warn("Service worker skipped", error));
}

async function initializeApp() {
  try {
    await loadRecords();
  } catch (error) {
    console.error(error);
    state.records = seedRecords();
  }
  setupOptions();
  bindEvents();
  render();
  registerServiceWorker();
}

initializeApp();

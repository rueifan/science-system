const pretestQuestions = [
  {
    question: "觀察某細胞的分裂過程，看到如下圖的狀態，請問此分裂最可能發生在何處？",
    image: "assets/images/q1-cell-division.png",
    options: [
      "公雞的睪丸",
      "長出羽毛的身體",
      "雞冠的傷口",
      "孵化中的雞蛋",
    ],
    answerIndex: 0,
  },
  {
    question: "細胞核中，兩條大小、形狀相似的染色體稱為什麼？",
    options: [
      "DNA",
      "單套染色體",
      "同源染色體",
      "複製染色體",
    ],
    answerIndex: 2,
  },
  {
    question: "果蠅複眼細胞的細胞核中有 8 條染色體，果蠅的卵細胞在形成的過程中，遺傳物質的變化情形如何？（橫軸表示時間、縱軸表示遺傳物質含量）",
    options: [
      { text: "1", image: "assets/images/q3-option-1.png" },
      { text: "2", image: "assets/images/q3-option-2.png" },
      { text: "3", image: "assets/images/q3-option-3.png" },
      { text: "4", image: "assets/images/q3-option-4.png" },
    ],
    answerIndex: 2,
  },
  {
    question: "生殖細胞（卵、精子）中有幾條染色體？",
    options: ["4", "8", "6", "10"],
    answerIndex: 2,
  },
  {
    question: "卵細胞與精子的受精位置在哪裡？",
    options: ["子宮", "輸卵管", "輸精管", "卵巢"],
    answerIndex: 1,
  },
  {
    question: "受精卵在哪裡著床？",
    options: ["子宮", "輸卵管", "輸精管", "卵巢"],
    answerIndex: 0,
  },
  {
    question: "人體在產生精子或卵子時會進行「甲」；卵子受精後會進行「乙」，形成新的個體，請問甲、乙為何？",
    options: [
      "甲：有性生殖；乙：無性生殖",
      "甲：無性生殖；乙：有性生殖",
      "甲：減數分裂；乙：細胞分裂",
      "甲：細胞分裂；乙：減數分裂",
    ],
    answerIndex: 2,
  },
  {
    question: "下列哪一種疾病和染色體異常有關？",
    options: ["感冒", "骨折", "唐氏症", "蛀牙"],
    answerIndex: 2,
  },
  {
    question: "人類精、卵結合與胚胎發育的過程依序為何？甲：精子進入女性體內　乙：胚胎著床　丙：精卵相遇　丁：胎兒發育",
    options: [
      "甲乙丙丁",
      "丙甲乙丁",
      "乙丙丁甲",
      "甲丙乙丁",
    ],
    answerIndex: 3,
  },
  {
    question: "產生精、卵一般是作有性生殖，請問有性生殖具有何種特質？",
    options: [
      "產生數量較多的後代",
      "產生體型較大的後代",
      "可以產生較多遺傳差異的後代",
      "可讓子代與親代的差異完全相同",
    ],
    answerIndex: 2,
  },
];

// 目前先讓前測與後測使用同一份題目。
// 如果後測要改成另一套題目，只要把下面這行改成新的題目陣列即可。
const posttestQuestions = pretestQuestions;

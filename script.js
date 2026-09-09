// ================================
// NOTHING - 실시간 접속자 수
// ================================

// Supabase 프로젝트 정보
const SUPABASE_URL = "https://ohrquagtlnajcyfrntwq.supabase.co";

// 아까 복사해 둔 Publishable key를 여기에 붙여 넣으세요.
const SUPABASE_KEY = "sb_publishable_s0qhosgXO9kdtnbCS5L7OQ_Nk-W1Vhe";

// Supabase 클라이언트 생성
const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// 화면의 사람 수
const peopleElement = document.getElementById("people");

// NOTHING 전용 공간
const channel = client.channel("nothing-room");

// 현재 사람 수를 화면에 표시
function updatePeopleCount() {
    const state = channel.presenceState();

    // 현재 연결된 사람들의 key 개수
    const count = Object.keys(state).length;

    if (count === 1) {
        peopleElement.textContent =
            "1 person is doing nothing.";
    } else {
        peopleElement.textContent =
            `${count} people are doing nothing.`;
    }
}

// Presence 변화 감지
channel.on(
    "presence",
    { event: "sync" },
    () => {
        updatePeopleCount();
    }
);

// NOTHING에 입장
channel.subscribe(async (status) => {

    if (status !== "SUBSCRIBED") {
        console.log("Supabase 연결 실패:", status);
        return;
    }

    // 나 자신을 현재 접속자로 등록
    await channel.track({
        joined_at: new Date().toISOString()
    });

    updatePeopleCount();
});

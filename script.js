// ================================
// NOTHING
// ================================

// Supabase 프로젝트 정보
const SUPABASE_URL = "https://ohrquagtlnajcyfrntwq.supabase.co";

const SUPABASE_KEY = "sb_publishable_s0qhosgXO9kdtnbCS5L7OQ_Nk-W1Vhe";

// Supabase 연결
const client = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ================================
// 1. 머문 시간
// ================================

let seconds = 0;

const timeElement = document.querySelector(".time");

function updateTime() {
    seconds++;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minuteText = String(minutes).padStart(2, "0");
    const secondText = String(remainingSeconds).padStart(2, "0");

    timeElement.textContent =
        `${minuteText}:${secondText}`;
}

setInterval(updateTime, 1000);


// ================================
// 2. 현재 사람 수
// ================================

const peopleElement = document.getElementById("people");

const channel = client.channel("nothing-room");

function updatePeopleCount() {

    const state = channel.presenceState();

    const count = Object.keys(state).length;

    if (count === 1) {

        peopleElement.textContent =
            "1 person is doing nothing.";

    } else {

        peopleElement.textContent =
            `${count} people are doing nothing.`;

    }
}


channel.on(
    "presence",
    { event: "sync" },
    () => {
        updatePeopleCount();
    }
);


channel.subscribe(async (status) => {

    if (status !== "SUBSCRIBED") {

        console.log(
            "Supabase 연결 실패:",
            status
        );

        return;
    }

    await channel.track({

        joined_at:
            new Date().toISOString()

    });

    updatePeopleCount();
});


// ================================
// 3. 빗소리
// ================================

const rainButton =
    document.getElementById("rainButton");

const rainAudio =
    document.getElementById("rainAudio");

let isPlaying = false;


rainButton.addEventListener(
    "click",
    async () => {

        if (!isPlaying) {

            try {

                await rainAudio.play();

                rainButton.textContent =
                    "Stop the rain";

                isPlaying = true;

            } catch (error) {

                console.log(
                    "빗소리를 재생할 수 없습니다.",
                    error
                );

            }

        } else {

            rainAudio.pause();

            rainButton.textContent =
                "Listen to rain";

            isPlaying = false;
        }
    }
);

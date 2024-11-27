const correctPin = "281103";
const images = [
    'images/H1.jpg', 'images/H2.jpg', 'images/H3.jpg',
    'images/H4.jpg', 'images/H5.jpg', 'images/H6.jpg',
    'images/H7.jpg', 'images/H8.jpg', 'images/H9.jpg',
    'images/H10.jpg', 'images/H11.jpg'
];
const songs = ['music/HBD.mp4'];
let currentImageIndex = 0;
let currentSongIndex = 0;
let isMusicLoaded = false;  // ตัวแปรเพื่อเช็คว่าเพลงได้โหลดและเริ่มเล่นแล้วหรือยัง

function checkPin() {
    const pinInput = document.getElementById('pinInput').value.replace(/\//g, '');
    if (pinInput === correctPin) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('cake').style.display = 'block';
        startCakeAnimation();
    } else {
        alert('รหัสผิด กรุณาลองใหม่');
    }
}

function startCakeAnimation() {
    const canvas = document.getElementById('cakeCanvas');
    const ctx = canvas.getContext('2d');
    let countdown = 15;

    function drawCake(candlesCount) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // เค้ก
        ctx.fillStyle = 'pink';
        ctx.fillRect(150, 200, 100, 50);

        // เทียน
        for (let i = 0; i < candlesCount; i++) {
            ctx.fillStyle = 'red';
            ctx.fillRect(170 + i * 20, 180, 10, 30);

            // เปลวไฟ
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo(175 + i * 20, 180);
            ctx.lineTo(180 + i * 20, 160);
            ctx.lineTo(185 + i * 20, 180);
            ctx.closePath();
            ctx.fill();
        }

        // เพิ่มข้อความ "เวลาอธิฐาน"
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('เวลาอธิฐาน', canvas.width / 2, 140);

        // ข้อความอวยพรวันเกิด
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('สุขสันต์วันเกิดน้าแฟน 🎉', canvas.width / 2, 20);
        ctx.fillText('สุขภาพร่างกายแข็งแรง 🎈', canvas.width / 2, 45);
        ctx.fillText('มีความสุขอยู่กับเค้าไปนานๆ น้า 🥳', canvas.width / 2, 65);
        ctx.fillText('เดะเจอกันค่อยเอาของขวัญน้า 🎂', canvas.width / 2, 90);
    }

    function updateTimer() {
        document.getElementById('timer').innerText = `เหลือเวลา: ${countdown} วินาที`;
        if (countdown <= 0) {
            document.getElementById('cake').style.display = 'none';
            document.getElementById('gallery').style.display = 'block';
            loadGallery();  // โหลดแกลอรี
            return;
        }
        drawCake(3);
        countdown--;
        setTimeout(updateTimer, 1000);
    }

    updateTimer();
}


function loadGallery() {
    const slider = document.getElementById('imageSlider');
    const bgMusic = document.getElementById('bgMusic');

    // ถ้าเพลงยังไม่ได้ถูกโหลดและเล่น ก็ให้โหลดเพลงและเล่น
    if (!isMusicLoaded) {
        bgMusic.src = songs[currentSongIndex];
        bgMusic.play();
        isMusicLoaded = true; // ตั้งค่าให้เพลงเริ่มเล่นแล้ว
    }

    // โหลดภาพ
    slider.innerHTML = `<img src="${images[currentImageIndex]}" style="max-width:100%; max-height:500px;">`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadGallery(); // โหลดภาพและเพลงใหม่
}

const correctPin = "281103";
const images = [
    'images/H1.jpg',
    'images/H2.jpg',
    'images/H3.jpg',
    'images/H4.jpg',
    'images/H5.jpg',
    'images/H6.jpg',
    'images/H7.jpg',
    'images/H8.jpg',
    'images/H9.jpg',
    'images/H10.jpg',
    'images/H11.jpg'
];

const songs = [
    'music/HBD.mp4',

];
let currentImageIndex = 0;
let currentSongIndex = 0;

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
            ctx.fillRect(170 + i*20, 180, 10, 30);
            
            // เปลวไฟ
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo(175 + i*20, 180);
            ctx.lineTo(180 + i*20, 160);
            ctx.lineTo(185 + i*20, 180);
            ctx.closePath();
            ctx.fill();
        }
    
        // เพิ่มข้อความ "เวลาอธิฐาน"
        ctx.font = '24px Arial'; // กำหนดขนาดตัวอักษร
        ctx.fillStyle = 'black'; // สีข้อความ
        ctx.textAlign = 'center'; // จัดตำแหน่งข้อความให้อยู่กลาง
        ctx.fillText('เวลาอธิฐาน', canvas.width / 2, 100); // วางข้อความที่ตำแหน่งกลางของแคนวาส (แก้ไขค่า Y ตามต้องการ)
    }

    function updateTimer() {
        document.getElementById('timer').innerText = `เหลือเวลา: ${countdown} วินาที`;
        if (countdown <= 0) {
            document.getElementById('cake').style.display = 'none';
            document.getElementById('gallery').style.display = 'block';
            loadGallery();
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

    slider.innerHTML = `<img src="${images[currentImageIndex]}" style="max-width:100%; max-height:500px;">`;
    bgMusic.src = songs[currentSongIndex];
    bgMusic.play();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadGallery();
}
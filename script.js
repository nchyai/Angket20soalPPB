// Data Soal Pola Pikir Bertumbuh (Growth Mindset)
const questions = [
    {
        id: 1,
        text: "Saya percaya bahwa kemampuan saya dapat ditingkatkan melalui usaha dan latihan yang konsisten.",
        category: "Pembelajaran"
    },
    {
        id: 2,
        text: "Ketika saya menghadapi kegagalan, saya melihatnya sebagai peluang untuk belajar dan berkembang.",
        category: "Ketahanan"
    },
    {
        id: 3,
        text: "Saya menyukai tantangan karena tantangan membantu saya tumbuh dan menjadi lebih baik.",
        category: "Ketahanan"
    },
    {
        id: 4,
        text: "Kritik dan umpan balik negatif membantu saya memahami area yang perlu saya tingkatkan.",
        category: "Keterbukaan"
    },
    {
        id: 5,
        text: "Saya tidak takut mencoba hal-hal baru meskipun saya mungkin akan gagal di awal.",
        category: "Keberanian"
    },
    {
        id: 6,
        text: "Ketika orang lain berhasil, itu menginspirasi saya dan membuat saya ingin berusaha lebih keras.",
        category: "Kolaborasi"
    },
    {
        id: 7,
        text: "Saya percaya bahwa kesuksesan datang dari kerja keras, bukan dari bakat bawaan.",
        category: "Pembelajaran"
    },
    {
        id: 8,
        text: "Saya senang belajar hal-hal baru dan menguasai keterampilan yang belum saya ketahui.",
        category: "Pembelajaran"
    },
    {
        id: 9,
        text: "Ketika saya tidak memahami sesuatu, saya mencari cara untuk memahaminya alih-alih menyerah.",
        category: "Ketahanan"
    },
    {
        id: 10,
        text: "Saya percaya bahwa fokus dan dedikasi dapat mengatasi hambatan apapun.",
        category: "Ketahanan"
    },
    {
        id: 11,
        text: "Saya tidak merasa rendah diri ketika seseorang mengetahui lebih banyak daripada saya.",
        category: "Keterbukaan"
    },
    {
        id: 12,
        text: "Saya suka menonton orang lain menyelesaikan masalah untuk belajar pendekatan baru.",
        category: "Kolaborasi"
    },
    {
        id: 13,
        text: "Kesalahan adalah bagian penting dari proses pembelajaran saya.",
        category: "Pembelajaran"
    },
    {
        id: 14,
        text: "Saya percaya bahwa otak saya dapat membentuk dan mengembangkan koneksi baru sepanjang hidup saya.",
        category: "Pembelajaran"
    },
    {
        id: 15,
        text: "Saya tidak merasa malu untuk meminta bantuan ketika saya membutuhkannya.",
        category: "Keterbukaan"
    },
    {
        id: 16,
        text: "Saya dapat belajar dari orang-orang yang berbeda dengan saya dan memiliki perspektif berbeda.",
        category: "Kolaborasi"
    },
    {
        id: 17,
        text: "Saya merasa termotivasi untuk terus belajar dan berkembang setiap hari.",
        category: "Motivasi"
    },
    {
        id: 18,
        text: "Ketika saya mencapai tujuan, saya segera menetapkan tujuan baru yang lebih menantang.",
        category: "Motivasi"
    },
    {
        id: 19,
        text: "Saya percaya bahwa dedikasi dan kerja keras lebih penting daripada talenta alami.",
        category: "Pembelajaran"
    },
    {
        id: 20,
        text: "Saya optimis tentang masa depan saya dan percaya bahwa saya dapat mencapai apa yang saya inginkan.",
        category: "Motivasi"
    }
];

// Kategori Soal
const categories = {
    "Pembelajaran": "📚 Pembelajaran",
    "Ketahanan": "💪 Ketahanan",
    "Keterbukaan": "🤝 Keterbukaan",
    "Keberanian": "🦁 Keberanian",
    "Kolaborasi": "👥 Kolaborasi",
    "Motivasi": "⚡ Motivasi"
};

// State
let currentQuestion = 0;
let answers = new Array(questions.length).fill(0);
let startTime = null;
let timerInterval = null;

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('totalQuestions').textContent = questions.length;
});

// Mulai Quiz
function startQuiz() {
    currentQuestion = 0;
    answers = new Array(questions.length).fill(0);
    startTime = Date.now();
    
    showScreen('quizScreen');
    showQuestion();
    startTimer();
}

// Tampilkan Screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Tampilkan Pertanyaan
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Generate answer options
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('button');
        option.className = 'answer-option';
        if (answers[currentQuestion] === i) {
            option.classList.add('selected');
        }
        option.textContent = i;
        option.onclick = () => selectAnswer(i);
        answersContainer.appendChild(option);
    }
    
    // Update tombol navigasi
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (currentQuestion === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Pilih Jawaban
function selectAnswer(value) {
    answers[currentQuestion] = value;
    
    // Update tampilan
    document.querySelectorAll('.answer-option').forEach((option, index) => {
        option.classList.remove('selected');
        if (index + 1 === value) {
            option.classList.add('selected');
        }
    });
}

// Soal Sebelumnya
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Soal Berikutnya
function nextQuestion() {
    if (answers[currentQuestion] === 0) {
        alert('Silakan pilih jawaban terlebih dahulu!');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
}

// Submit Quiz
function submitQuiz() {
    if (answers[currentQuestion] === 0) {
        alert('Silakan pilih jawaban terlebih dahulu!');
        return;
    }
    
    clearInterval(timerInterval);
    showResults();
}

// Hitung Hasil
function calculateResults() {
    const score = (answers.reduce((a, b) => a + b, 0) / (questions.length * 5)) * 100;
    
    let category = 'Pola Pikir Tetap';
    let categoryTitle = '❌ Pola Pikir Tetap';
    let description = 'Anda cenderung percaya bahwa kemampuan adalah tetap dan tidak dapat dikembangkan.';
    let recommendation = 'Cobalah untuk mulai melihat tantangan sebagai peluang belajar. Ingat, setiap ahli dimulai sebagai pemula. Mulai dari hal kecil dan percayai diri Anda untuk tumbuh.';
    
    if (score >= 80) {
        category = 'Pola Pikir Bertumbuh Kuat';
        categoryTitle = '🌟 Pola Pikir Bertumbuh Kuat';
        description = 'Anda memiliki pola pikir bertumbuh yang sangat kuat. Anda percaya pada kekuatan usaha dan pembelajaran berkelanjutan.';
        recommendation = 'Teruskan komitmen Anda terhadap pertumbuhan pribadi. Berbagi pengetahuan dengan orang lain dan jadilah mentor bagi mereka yang ingin berkembang.';
    } else if (score >= 60) {
        category = 'Pola Pikir Bertumbuh Sedang';
        categoryTitle = '✨ Pola Pikir Bertumbuh Sedang';
        description = 'Anda memiliki pola pikir bertumbuh yang baik, meskipun masih ada beberapa area untuk perbaikan.';
        recommendation = 'Tingkatkan keyakinan Anda dalam kemampuan untuk belajar. Cari lebih banyak pengalaman tantangan dan lihat setiap hambatan sebagai kesempatan.';
    } else if (score >= 40) {
        category = 'Pola Pikir Campuran';
        categoryTitle = '🔄 Pola Pikir Campuran';
        description = 'Anda memiliki kombinasi dari pola pikir bertumbuh dan tetap. Anda percaya pada pertumbuhan dalam beberapa area tetapi tidak di area lain.';
        recommendation = 'Mulai dengan mengidentifikasi area yang ingin Anda kembangkan. Ambil langkah kecil dan rayakan setiap kemajuan, tidak peduli seberapa kecil.';
    }
    
    return {
        score: Math.round(score),
        category: category,
        categoryTitle: categoryTitle,
        description: description,
        recommendation: recommendation
    };
}

// Analisis Kategori
function analyzeCategories() {
    const categoryScores = {};
    
    for (let i = 0; i < questions.length; i++) {
        const cat = questions[i].category;
        if (!categoryScores[cat]) {
            categoryScores[cat] = { total: 0, count: 0 };
        }
        categoryScores[cat].total += answers[i];
        categoryScores[cat].count++;
    }
    
    let analysis = '';
    for (const [cat, data] of Object.entries(categoryScores)) {
        const catScore = Math.round((data.total / (data.count * 5)) * 100);
        const icon = categories[cat].split(' ')[0];
        analysis += `<p><strong>${categories[cat]}</strong>: ${catScore}% - ${getScoreDescription(catScore)}</p>`;
    }
    
    return analysis;
}

// Deskripsi Skor
function getScoreDescription(score) {
    if (score >= 80) return 'Sangat Baik ✓';
    if (score >= 60) return 'Baik ✓';
    if (score >= 40) return 'Cukup';
    return 'Perlu Ditingkatkan';
}

// Tampilkan Hasil
function showResults() {
    const results = calculateResults();
    const elapsedTime = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    document.getElementById('finalScore').textContent = results.score;
    document.getElementById('scoreCategoryTitle').textContent = results.categoryTitle;
    document.getElementById('scoreCategoryDesc').textContent = results.description;
    document.getElementById('analysisContent').innerHTML = analyzeCategories();
    document.getElementById('recommendationText').textContent = results.recommendation;
    document.getElementById('completionTime').textContent = `Waktu Pengerjaan: ${minutes} menit ${seconds} detik`;
    
    showScreen('resultsScreen');
}

// Timer
function startTimer() {
    let timeLeft = 30 * 60; // 30 menit
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Waktu habis! Angket akan diselesaikan secara otomatis.');
            submitQuiz();
            return;
        }
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
    }, 1000);
}

// Download Hasil
function downloadResult() {
    const results = calculateResults();
    const content = `
Hasil Angket Pola Pikir Bertumbuh
================================

Skor Akhir: ${results.score}/100
Kategori: ${results.categoryTitle.substring(2)}

Deskripsi:
${results.description}

Rekomendasi:
${results.recommendation}

Analisis Per Kategori:
${analyzeCategories().replace(/<[^>]*>/g, '')}

================================
Terima kasih telah mengisi angket ini!
Dibuat dengan ❤️ | 2024
    `.trim();
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'Hasil_Angket_PPB.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Ulang Angket
function restartQuiz() {
    showScreen('startScreen');
}
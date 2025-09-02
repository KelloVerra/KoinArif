import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import materialStyles from '../../pages/Material.module.css';

import imgarifImagine from '/material/arifImagine.svg';
import imgarifSaving from '/material/arifSaving.svg';
import imgarifAnalyze from '/material/arifAnalyze.svg';
import imgarifPrepare from '/material/arifPrepare.svg';
import imgHappy from '/material/arifHappy.svg';

export default function material1() {
    return {
        id: 3,
        load: 3,
        error: false,
        title: 'Investasi dan Pinjaman',
        desc: 'Membahas pengertian dari bunga, kinerja bunga di Investasi dan Pinjaman serta risiko yang sembunyi dibalik bunga.',
        estimateDuration: '10 menit',
        displayTitle: <h1 className={materialStyles["header"]}>
            <span className={materialStyles["gradient-heading"]}>Investasi </span>
            dan
            <span className={materialStyles["gradient-heading"]}> Pinjaman</span>
        </h1>,
        requiredQuizCoins: 155,        
        submoduleData: [
            {
                id: 0,
                materialId: 3,
                desc: 'bunga',
                terms: [
                    {
                        name: ['bunga', 'suku bunga', ],
                        definition: [
                            'imbalan atau biaya dari penggunaan uang',
                            'tambahan biaya dari peminjaman uang',
                            'keuntungan yang diperoleh di dalam investasi',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'bunga adalah imbalan atau biaya dari penggunaan uang',
                        'saat investasi, kamu memperoleh keuntungan dari bunga',
                        'saat uangmu dipinjam oleh orang lain, Orang tersebut wajib mengembalikan uang yang dipinjamnya, ditambah dengan bunga pinjamannya',
                        'jika kamu meminjam uang dari pihak lain, kamu wajib mengembalikan uang yang kamu pinjam, ditambah dengan bunga pinjamannya',
                    ],
                    'false': [
                        'bunga adalah bagian tanaman yang cantik dan indah',
                        'pada peminjaman, uang yang kamu kembalikan lebih sedikit dibandingkan dengan uang yang kamu pinjam',
                        'saat meminjam uang, kamu memperoleh keuntungan dari bunga',
                        'konsep dari bunga terlalu membingungkan, maka tidak perlu dipikirkan',
                    ],
                },
            },
            {
                id: 1,
                materialId: 3,
                desc: 'investasi',
                terms: [
                    {
                        name: ['investasi', 'penanaman modal', ],
                        definition: [
                            'menempatkan aset dimana nilainya akan berkembang di masa depan',
                            'instrumen yang dapat dimanfaatkan untuk mendapatkan keuntungan di masa depan',
                        ],
                    },
                    {
                        
                        name: ['profil risiko', 'profil risiko investasi', ],
                        definition: [
                            'seberapa berani seseorang menghadapi kemungkinan rugi dalam investasi',
                            'alat yang membantumu saat menentukan jenis investasi yang cocok bagimu',
                            'penyesuaian ekspektasi risiko yang bisa diterima seseorang dalam investasi',
                        ],
                    }
                ],
                facts: {
                    'true': [
                        'investasi ialah menempatkan aset agar nilainya bertambah di masa depan',
                        'jika kamu rutin menginvestasikan aset, kamu memperoleh keuntungan jangka panjang',
                        'profil risiko investasi ialah seberapa berani kamu menghadapi kemungkinan rugi',
                        'profil risiko dapat membantumu saat menentukan jenis investasi',
                        'memilih investasi rendah risiko cocok bagi orang yang main aman',
                    ],
                    'false': [
                        'kalau kamu belum berani, boleh memilih investasi risiko tinggi',
                        'menyusun profil risiko investasi akan membuatmu lebih khawatir',
                    ],
                },
            },
            {
                id: 2,
                materialId: 3,
                desc: 'pinjaman',
                terms: [
                    {
                        name: ['pinjaman', 'peminjaman', ],
                        definition: [
                            'menerima uang dari pihak lain dengan kewajiban mengembalikan',
                            'perpindahan uang dari pihak ke pihak yang mengajukan dengan kesepakatan pembayaran kembali',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'kamu wajib membayar bunga peminjaman',
                        'pinjaman sama dengan menerima uang dari orang lain',
                        'pinjaman cocok untuk memenuhi kebutuhan yang mendesak',
                        'jika cicilan pinjaman melebihi kemampuan membayar, maka kondisi finansialmu akan terbebani',
                        'setelah kamu mengajukan peminjaman, kamu wajib mengembalikannya dengan cara dicicil',
                        'salah satu cara memastikan legalitas pinjaman ialah mengecek keberadaannya di daftar resmi OJK',
                    ],
                    'false': [
                        'dalam peminjaman, jika telat bayar, tidak akan didenda',
                        'jika kamu tidak punya uang, maka kamu boleh mengajukan pinjaman setiap saat',
                        'kamu dapat mengajukan peminjaman dimanapun tanpa mengecek legalitas pihak',
                    ],
                },
            },
        ],
        component: _ => (
            <>
                <SubModuleContainer id={{material_id:3,submodule_id:0}} minimizedMaxContentCount={3} minimizedHeight={13}>
                    <h2>Bunga</h2>
                    <p>Kita akan membahas bunga secara finansial yah! Bukan bunga yang berwarna-warni..</p>
                    <p>Bunga adalah imbalan atau biaya dari penggunaan uang.</p>
                    <p>Situasi dimana aja kamu bisa bertemuan dengan bunga?</p>
                    <p data-is-list={true}>Saat menabung/investasi di platform khusus, kamu mendapat bunga.</p>
                    <p data-is-list={true}>Saat meminjam uang, kamu membayar bunga.</p>
                    <img src={imgarifImagine} alt="Arif mempelajari kinerja bunga finansial" width="200px" />
                    <p>Konsep dari bunga sendiri mungkin terlihat membingungkan,</p>
                    <p>Jadi, mari lihat manfaat dari bunga!</p>
                    <p>Saat menabung/investasi, Bunga memberi keuntungan.</p>
                    <p>Saat uangmu dipinjam oleh orang lain, Orang tersebut wajib mengembalikan uang yang dipinjamnya, ditambah dengan bunga pinjamannya.</p>
                    <p>Di sisi lain, jika kamu meminjam uang dari pihak lain, kamu wajib mengembalikan uang yang kamu pinjam, ditambah dengan bunga pinjamannya, secara berkala.</p>
                    <p>Contoh wujud asli bunga:</p>
                    <p data-is-list={true}>Menabung di bank dengan bunga 3% per tahun, </p>
                    <p data-is-list={true}>Jadi uang tabunganmu bertambah semakin lama kamu menabung di bank, sebagai bentuk imbalan dari bank.</p>
                    <p data-is-list={true}>Pinjaman online dengan bunga 10% per bulan,</p>
                    <p data-is-list={true}>Jadi uang yang kamu kembalikan lebih besar dibandingkan dengan uang yang kamu pinjam.</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:3,submodule_id:0}} />
                <SubModuleContainer id={{material_id:3,submodule_id:1}} minimizedMaxContentCount={4} minimizedHeight={19}>
                    <h2>Investasi</h2>                  
                    <p>Investasi ialah menempatkan aset untuk mengembangkan nilainya di masa depan.</p>
                    <p>Mirip dengan menabung, tapi uang/aset yang kamu tempatkan akan terus berkembang nilainya sesuai dengan faktor tertentu.</p>
                    <p>Jadi, kamu memperoleh keuntungan dalam jangka panjang jika rutin menaruh aset.</p>
                    <img src={imgarifSaving} alt="Arif selalu berusaha menyisih pendapatannya untuk masa depannya" width="200px" data-is-big={true} />
                    <p>Bayangkan, kamu menyisihkan sisa aset atau uang, digunakan untuk membeli saham suatu perusahaan.</p>
                    <p>Nilai aset yang disisih akan naik secara berkala dan kamu mendapatkan keuntungan.</p>
                    <p>Tapi kamu harus selalu mengetahui kondisi pasar lebih dalam.</p>
                    <p>Kamu harus hindari harga saham yang terus menurun yang dapat menyebabkan kerugian.</p>
                    <p>Karena itu, selalu sesuaikan dengan tujuan & profil risiko yang dapat kamu terima.</p>
                    <img src={imgarifPrepare} alt="Arif selalu sedia menghadapi risiko" width="200px" data-is-big={true} />
                    <p>Profil risiko investasi ialah seberapa berani kamu menghadapi kemungkinan rugi.</p>
                    <p>Profil risiko dapat membantu kamu saat menentukan jenis investasi yang cocok.</p>
                    <p>Kalau kamu main aman: pilih investasi rendah risiko (deposito, reksa dana pasar uang).</p>
                    <p>Kalau kamu sudah berani: bisa milih investasi berisiko tinggi (saham, crypto).</p>
                    <p>Dengan tahu profil risiko, kamu nggak harus was-was saat investasi.</p>
                    <p>Investasi jadi lebih sesuai dengan jangka waktu, kebutuhan dan kenyamananmu.</p>
                    <p>Fun Fact: Sebutan lain dari investasi adalah menaman modal.</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:3,submodule_id:1}} />
                <SubModuleContainer id={{material_id:3,submodule_id:2}} minimizedMaxContentCount={4} minimizedHeight={18}>
                    <h2>Pinjaman</h2>
                    <p>Pinjaman sama dengan menerima uang dari pihak lain dengan kewajiban mengembalikan.</p>
                    <p>Kamu pastinya pernah kekurangan uang meski ingin memenuhi suatu kebutuhan.</p>
                    <p>Oleh karena itu, mengajukan pinjaman ialah salah satu caranya.</p>
                    <p>Kredit motor, KPR rumah, pinjaman online ialah salah satu dari bentuk pinjaman umum.</p>
                    <p>Setelah kamu mengajukan pinjaman, kamu wajib mengembalikannya.</p>
                    <p>Selain mengembalikan nilai uang yang setara, kamu juga wajib membayar biaya tambahan dalam bentuk bunga.</p>
                    <p>Pada umumnya, tagihan pinjaman dilunasi dengan cara dicicil berkala.</p>
                    <img src={imgarifAnalyze} alt="Arif sedang menganalisa kondisi finansialnya" width="200px" />
                    <p>Pinjaman cocok untuk memenuhi kebutuhan yang mendesak.</p>
                    <p>Eits, dilarang keras meminjam untuk memenuhi keinginan ya, karena ada risikonya juga:</p>
                    <p>Peminjaman yang terlalu banyak bisa jadi beban finansial.</p>
                    <p>Pengembalian pinjaman bisa berubah jadi beban jika cicilan melebihi kemampuan bayar.</p>
                    <p>Kalau nggak disiplin hingga telat bayar, kamu bisa didenda.</p>
                    <p>Penting untuk diingat, kamu jangan sekedar meminjam uang dengan sembarang pihak, ya! </p>
                    <p>Kamu patut mengecek legalitas pihak tersebut.</p>
                    <p>Salah satu cara paling umum untuk memastikan legalitas pinjaman adalah terdaftar resmi di OJK (Otoritas Jasa Keuangan).</p>
                    <p>Semakin legal pihak pinjaman, semakin ringan risiko kesulitan yang kamu alami.</p>
                    <img src={imgHappy} alt="Arif membagi kebijaksanaannya dengan bahagia" width="200px" data-is-big={true} />
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:3,submodule_id:2}} />
            </>
        )
    };
}
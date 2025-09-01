import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import materialStyles from '../../pages/Material.module.css';

import imgdebgu from '/Level.svg';

export default function material1() {
    return {
        id: 2,
        load: 2,
        error: false,
        title: 'Risiko dan Urgensi',
        desc: 'Membahas mengenai pengelolaan Risiko, situasi Urgen maupun Darurat.',
        estimateDuration: '7 menit',
        displayTitle: <h1 className={materialStyles["header"]}>
            <span className={materialStyles["gradient-heading"]}>Risiko </span>
            dan
            <span className={materialStyles["gradient-heading"]}> Urgensi</span>
        </h1>,
        requiredQuizCoins: 175,
        submoduleData: [
            {
                id: 0,
                materialId: 2,
                desc: 'risiko',
                terms: [
                    {
                        name: ['risiko', 'risiko kerugian', 'risiko negatif' ],
                        definition: [
                            'kemungkinan munculnya kerugian',
                            'kemungkinan kejadian yang tidak terduga',
                            'kemungkinan kejadian yang bisa merugikan',
                            'kemungkinan kejadian yang berdampak negatif',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'risiko bersifat sulit diprediksi',
                        'risiko adalah kemungkinan kejadian tidak terduga, yang bisa merugikanmu',
                        'dana darurat adalah alat untuk menghadapi risiko',
                        'asuransi dapat melindungi kita dan aset kita dari kerugian signifikan',
                        'menyusun strategi menghadapi risiko adalah perilaku yang bijak',
                    ],
                    'false': [
                        'dampak risiko selalu kecil dan ringan',
                        'semua risiko bisa dihindari dengan cara tidak dipikirkan atau dilupakan',
                        'risiko harus selalu ditakuti, jika kita selalu panik, risiko tidak akan pernah terjadi',
                    ],
                },
            },
            {
                id: 1,
                materialId: 2,
                desc: 'dana darurat',
                terms: [
                    {
                        name: ['dana darurat', 'dana urgen',  ],
                        definition: [
                            'alat untuk menghadapi risiko ringan',
                            'penyisihan beberapa uang untuk menghadapi kemungkinan terjadinya risiko',
                            'dana untuk menghadapi kemungkinan dari terjadi  kerugian',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'dana darurat ialah alat untuk menghadapi risiko',
                        'dana darurat membuat kita tidak perlu khawatir lagi dengan risiko',
                    ],
                    'false': [
                        'menyisih dana darurat tiap bulan tidaklah wajib',
                        'dana darurat dapat digunakan kapan saja dan bebas leluasa',
                        'jika ada kejadian urgen, gunakan uang dari tabunganmu, tidak perlu tabungan darurat',
                    ],
                },
            },
            {
                id: 2,
                materialId: 2,
                desc: 'asuransi',
                terms: [
                    {
                        name: ['asuransi', ],
                        definition: [
                            'perlindungan finansial ketika adanya kerugian signifikan',
                            'alat untuk menghadapi risiko yang dampaknya signifikan',
                            'pertanggungan untuk melindungi kondisi finansial pihak berasuransi',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'asuransi cocok untuk mencegah kerugian total atau kehilangan segalanya',
                        'asuransi diberikan oleh perusahaan asuransi kepada seseorang',
                        'premi adalah sebutan lain dari jumlah uang yang perlu rutin dibayar',
                        'asuransi properti bertugas melindungi rumahmu atau bangunan dari kerusakan/kerugian',
                        'asuransi perjalanan melindungimu dari kehilangan barang saat berpergian',
                    ],
                    'false': [
                        'asuransi sangat cocok untuk menghadapi risiko ringan seperti bangun kesiangan',
                        'agar mendapat bantuan finansial, harus melanggar perjanjian / polis asuransi',
                        'tidak wajib membayar premi asuransi',
                        'asuransi kesehatan akan menanggung biaya membeli handphone atau kendaraan',
                        'dengan asuransi, kamu akan selalu merasa khawatir dan cemas',
                    ],
                },
            },
        ],
        component: _ => (
            <>
                <SubModuleContainer id={{material_id:2,submodule_id:0}} minimizedMaxContentCount={3} minimizedHeight={12}>
                    <h2>Risiko</h2>
                    <p>Risiko ialah kemungkinan kejadian tidak terduga, yang bisa merugikanmu</p>
                    <p>Seperti, sakit, kerusakan, kecelakaan, kematian, atau kehilangan aset</p>
                    <img src={imgdebgu} alt="Illustrasi risiko" width="200px" />
                    <p>Risiko bersifat sulit diprediksi, datangnya kejadian tidak diketahui</p>
                    <p>Dampaknya beragam, bisa kecil, bisa besar</p>
                    <p>Tidak semua bisa dihindari sepenuhnya, namun bisa dikelola</p>
                    <p>Beberapa strategi mengelola risiko ialah:</p>
                    <p>- Menyiapkan dana darurat, cocok untuk keadaan mendesak</p>
                    <p>- Menggunakan asuransi, asuransi dapat melindungi kita & aset kita dari kerugian signifikan</p>
                    <p>Jangan merasa ditakuti oleh risiko.</p>
                    <p>Daripada panik, Sebaiknya meluangkan waktu menyusun strategi menghadapi risiko.</p>
                    <p>Selanjutnya, ayo bahas strategi-strategi tersebut!</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:2,submodule_id:0}} />
                <SubModuleContainer id={{material_id:2,submodule_id:1}} minimizedMaxContentCount={4} minimizedHeight={17}>
                    <h2>Dana Darurat</h2>
                    <p>Bayangkan Dana Darurat sebagai tabungan khusus untuk menghadapi risiko</p>
                    <p>Berbeda dengan tabungan biasa, dana ini hanya dapat dipakai saat keadaan mendesak.</p>
                    <p>Dengan dana darurat, tidak perlu khawatir lagi dengan risiko!</p>
                    <p>Jika terjadinya kecelakaan atau kehilangan pekerjaan, tidap perlu pusing lagi.</p>
                    <p>Kamu dapat menjalankan hidupmu seperti biasa, sambil memulihkan kerusakan yang terjadi.</p>
                    <p>Namun kamu harus banget disiplin menyisihkan dengan rutin, tiap bulan.</p>
                    <p>Dilarang banget dipakai untuk hal yang tidak terkait yah!</p>
                    <p>Gunakan jika ada kondisi darurat nyata.</p>
                    <img src={imgdebgu} alt="Seperti kata pepatah, sedia payung sebelum hujan!" width="200px" />
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:2,submodule_id:1}} />
                <SubModuleContainer id={{material_id:2,submodule_id:2}} minimizedMaxContentCount={5} minimizedHeight={22}>
                    <h2>Asuransi</h2>
                    <p>Asuransi adalah perlindungan finansial ketika adanya kerugian signifikan.</p>
                    <p>Asuransi cocok untuk menghadapi risiko yang lebih signifikan.</p>
                    <p>Jika memiliki dana darurat saja tidak dapat menghadapinya risiko tersebut.</p>
                    <p>Tanpa asuransi, kamu dapat mengalami kerugian total dan bahkan kehilangan segalanya.</p>
                    <img src={imgdebgu} alt="Ilustrasi risiko" width="200px" />
                    <p>Asuransi diberikan oleh perusahaan asuransi kepada seseorang maupun suatu pihak.</p>
                    <p>Agar diberi bantuan finansial, kamu harus menaati perjanjian / polis-nya, dan wajib membayar premi.</p>
                    <p>Premi adalah sebutan lain dari jumlah uang yang perlu rutin dibayar.</p>
                    <p>Tergantung dengan jenisnya, tiap asuransi menanggung aspek yang berbeda.</p>
                    <p>Jenis-jenis asuransi yang umum :</p>
                    <p>Asuransi Jiwa, melindungi keluarga/ahli waris saat pencari nafkah meninggal.</p>
                    <p>Asuransi Kesehatan, menanggung biaya pengobatan dan rawat inap.</p>
                    <p>Asuransi Kendaraan, menanggung kerusakan atau kehilangan kendaraan.</p>
                    <p>Asuransi Properti, melindungi rumah atau bangunan dari kerusakan/kerugian.</p>
                    <p>Asuransi Perjalanan, perlindungan selama bepergian (jika terjadinya kehilangan barang).</p>
                    <p>Dengan asuransi, kamu dapat merasa aman, nyaman dan tidak lagi khawatir.</p>
                    <img src={imgdebgu} alt="Bebas khawatir jika bijak pengelolaan risiko" width="200px" />
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:2,submodule_id:2}} />
            </>
        )
    };
}
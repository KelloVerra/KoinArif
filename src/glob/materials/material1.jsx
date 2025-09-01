import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import materialStyles from '../../pages/Material.module.css';

import imgdebgu from '/Level.svg';

export default function material1() {
    return {
        id: 1,
        load: 1,
        error: false,
        title: 'Pengenalan dengan Aset',
        desc: 'Membahas pengertian dari aset serta hal yang berinteraksi terhadap aset.',
        estimateDuration: '6 menit',
        displayTitle: <h1 className={materialStyles["header"]}>
            Pengenalan dengan
            <span className={materialStyles["gradient-heading"]}> Aset</span>
        </h1>,
        requiredQuizCoins: 100,
        submoduleData: [
            {
                id: 0,
                materialId: 1,
                desc: 'aset',
                terms: [
                    {
                        name: ['aset', 'kekayaan', 'harta', 'emas', 'tanah' ],
                        definition: [
                            'benda berharga',
                            'benda yang memiliki nilai ',
                            'benda yang bisa dimanfaatkan secara finansial di masa depan',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'aset adalah suatu kekayaan yang dimiliki oleh individu maupun suatu pihak',
                        'uang, emas dan tanah merupakan contoh dari aset',
                        'uang tergolong aset lancar',
                        'rumah dan emas termasuk aset tetap',
                        'merek dagang tergolong sebagai aset yang tak berwujud',
                        'nilai tukar aset selalu berubah',
                    ],
                    'false': [
                        'nilai tukar aset tetap',
                        'uang termasuk aset tetap',
                        'emas tergolong aset lancar',
                        'jenis aset tetap memiliki nilai yang salalu sama',
                        'kendaraan, rumah dan handphone tidak termasuk aset',
                    ],
                },
            },
            {
                id: 1,
                materialId: 1,
                desc: 'liabilitas',
                terms: [
                    {
                        name: ['liabilitas', 'hutang', 'utang' ],
                        definition: [
                            'hal yang menguras aset',
                            'kewajiban finansial, bisa berupa tagihan yang harus dibayar',
                            'hal yang dilunasi dengan uang, barang maupun jasa',
                            'pembayaran sebagai bentuk tanggung jawab finansial',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'liabilitas ialah kewajiban finansial, berupa tagihan yang harus dibayar',
                        'hutang dibayar dengan uang maupun jasa',
                        'pengelolaan liabilitas harus bijak agar tidak membebani kodisi finansialmu',
                        'memantau jatuh temponya utang termasuk strategi pengelolaan liabilitas',
                        'membuat anggaran khusus untuk membayar tagihan merupakan strategi pengelolaan liabilitas',
                    ],
                    'false': [
                        'mencatat pembayaran utang tidak termasuk strategi pengelolaan liabilitas',
                        'biaya hutang tidak wajib dibayar dan harus selalu dihindari',
                        'bijak mengelola liabilitas agar kodisi finansialmu makin terbebani',
                    ],
                },
            },
            {
                id: 2,
                materialId: 1,
                desc: 'menabung',
                terms: [
                    {
                        name: ['menabung', 'tabungan' ],
                        definition: [
                            'pengumpulan uang untuk dipakai di masa depan',
                            'menyimpan uang dengan tujuan dan jangka waktu tertentu',
                            'penyimpanan uang untuk memenuhi kebutuhan atau keinginan di masa depan',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'tabungan adalah simpanan uang untuk memenuhi kebutuhan atau keinginan di masa depan',
                        'siapa saja dapat menabung dimana saja',
                        'rekening bank dan dompet digital dapat dimanfaatkan sebagai tabungan',
                        'menabung harus mempunyai tujuan dan jangka waktu yang sesuai',
                        'tabungan dana pensiun, memiliki jangka waktu melebihi 5 tahun',
                        'boleh memiliki lebih dari 1 tabungan',
                    ],
                    'false': [
                        'tabungan dana darurat boleh digunakan untuk membiayai liburan',
                        'menabung dengan jangka pendek yaitu sekitar 5 tahun',
                        'sebelum memulai menabung, harus punya dana besar dulu',
                        'tidak boleh memiliki lebih dari 1 tabungan',
                    ],
                },
            },
            {
                id: 3,
                materialId: 1,
                desc: 'inflasi',
                terms: [
                    {
                        name: ['inflasi', 'inflasi aset', ],
                        definition: [
                            'kenaikan harga barang secara umum',
                            'penurunan nilai tukar uang seiring waktu',
                            'penurunan nilai aset',
                            'peningkatan harga barang dan jasa',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'inflasi ialah penurunan nilai tukar uang',
                        'ketika jarang menabung, jumlah nilai tabungan terus berkurang seiring waktu',
                        'pengeluaran belanja bulananmu akan terus naik seiring waktu berkat inflasi',
                        'penganggaran bermanfaat untuk melawan inflasi',
                    ],
                    'false': [
                        'inflasi ialah penurunan harga barang secara umum',
                        'pengelolaan pengeluaran & gaya hidup agar boros',
                        'tabungan patut di diamkan karena nilai uang bisa bertambah sendiri',
                    ],
                },
            },
        ],
        component: _ => (
            <>
                <SubModuleContainer id={{material_id:1,submodule_id:0}} minimizedMaxContentCount={4} minimizedHeight={18}>
                    <h2>Aset</h2>
                    <p>Aset adalah suatu harta, sumber daya maupun kekayaan yang dimiliki oleh seseorang, maupun suatu pihak.</p>
                    <p>Dengan memiliki Aset, kamu memiliki kesempatan untuk memanfaatkannya di masa mendatang.</p>
                    <p>Salah satu contoh Aset ialah: Uang dan Benda berharga seperti emas & tanah.</p>
                    <p>Aset-aset tersebut dapat ditukar dengan aset yang nilainya dianggap sesuai.</p>
                    <p>Uang dan Tabungan termasuk aset lancar.</p>
                    <p>Karena mudah dicairkan, alias gampang ditukar dengan nilai yang dianggap sama.</p>
                    <p>Rumah, Tanah dan Emas termasuk aset tetap.</p>
                    <p>Karena benda tersebut lebih sulit ditukar dengan benda lain serta memiliki nilai yang berbeda-beda.</p>
                    <img src={imgdebgu} alt="Ilustrasi Contoh Aset" width="200px" />
                    <p>Aset tidak selalu memiliki wujud fisik, loh!</p>
                    <p>Hak cipta, merek dagang ialah salah satu aset yang tak berwujud.</p>
                    <p>Namun ingat, Nilai tukar aset tidaklah tetap selamanya.</p>
                    <p>Nilai tukar aset dapat naik maupun turun. tergantung dengan faktor-faktor tertentu.</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:0}} />
                <SubModuleContainer id={{material_id:1,submodule_id:1}} minimizedMaxContentCount={5} minimizedHeight={21}>
                    <h2>Liabilitas</h2>
                    <p>Liabilitas, alias Utang, ialah kewajiban finansial, berupa tagihan yang harus kamu bayar.</p>
                    <p>Dibayar dengan uang, barang berharga maupun jasa.</p>
                    <p>Singkatnya, Liabilitas adalah hal yang menguras asetmu.</p>
                    <p>Liabilitas tidak dapat dihindari sepenuhnya, namun kamu bisa memahami cara pengelolaannya.</p>
                    <img src={imgdebgu} alt="Illustrasi dari contoh liabilitas yang umum" width="200px" />
                    <p>Pengelolaan liabilitas harus bijak agar tidak membebani kodisi finansialmu.</p>
                    <p>Beberapa cara mengelola liabilitas ialah:</p>
                    <p>Pantau utangmu, seperti jumlahnya dan jatuh temponya.</p>
                    <p>Catat pembayaran & transaksi utang, agar nggak kebingungan ya.</p>
                    <p>Buatlah anggaran (budget) khusus untuk membayar tagihan.</p>
                    <p>Intinya, liabilitas tidaklah selalu buruk, asal dikendali dan direncana dengan bijak!</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:1}} />
                <SubModuleContainer id={{material_id:1,submodule_id:2}} minimizedMaxContentCount={4} minimizedHeight={15}>
                    <h2>Menabung</h2>
                    <p>Kamu simpan sekarang, dipakai nanti di masa depan, itulah menabung.</p>
                    <p>Kamu dapat menabung dimana saja.</p>
                    <p>Mulai dari tabungan pribadi, rekening bank dan dompet digital.</p>
                    <p>Yang penting, kamu punya jangka waktu dan tujuan menabung yang jelas bagimu.</p>
                    <img src={imgdebgu} alt="Arif suka menabung, loh!" width="200px" />
                    <p>Jika tujuanmu untuk membeli gadget mahal, liburan, untuk jaga-jaga keadaan darurat.</p>
                    <p>Jangka waktu pendek, kurang dari 1 tahun atau hingga tabungan tersebut cukup untuk memenuhi tujuanmu.</p>
                    <p>Jika tujuanmu untuk membiayai pendidikan maupun menyimpan modal usaha awal.</p>
                    <p>Jangka waktunya menengah, sekitar 1 - 5 tahun.</p>
                    <p>Jika tujuanmu untuk menyiapkan dana pensiun maupun dana pendidikan tinggi.</p>
                    <p>Jangka waktunya panjang, melebihi 5 tahun.</p>
                    <p>Intinya, kamu harus selalu setia dengan tujuanmu menabung.</p>
                    <p>Contoh, Jangan ambil dana darurat untuk berliburan, Tujuan awalnya akan gagal total.</p>
                    <p>Anggaplah tabunganmu sebagai teman yang setia,</p>
                    <p>Dia akan menemanimu jika kamu juga setia padanya.</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:2}} />
                <SubModuleContainer id={{material_id:1,submodule_id:3}} minimizedMaxContentCount={3} minimizedHeight={12}>
                    <h2>Inflasi</h2>
                    <p>Inflasi ialah kenaikan harga barang / jasa secara umum.</p>
                    <p>Artinya, nilai uangmu berkurang seiring waktu.</p>
                    <p>Contoh: </p>
                    <p>Harga 1 Nasi goreng di tahun 2015 = Rp5.000</p>
                    <p>Harga 1 Nasi goreng di tahun 2015 = Rp10.000</p>
                    <p>Dalam 10 tahun, harga barang yang sama naik 100%</p>
                    <p>Uang Rp 5K sudah tidak bisa membeli barang yang sama seperti dulu.</p>
                    <img src={imgdebgu} alt="Nilai tukar nasi goreng" width="200px" />
                    <p>Selain harga barang, dampak inflasi kepada keunganmu ialah:</p>
                    <p>Jika tidak rajin menabung, nilai tabunganmu bisa “tergerus” nilainya.</p>
                    <p>Pengeluaran belanja bulananmu akan terus naik seiring waktu</p>
                    <img src={imgdebgu} alt="Arif suka menabung, loh!" width="200px" />
                    <p>Jangan cemas, kamu bisa melawan inflasi dengan strategi seperti:</p>
                    <p>Mengelola pengeluaran & gaya hidupmu, kurangi pemborosan</p>
                    <p>Memanfaatkan strategi penganggaran yang efektif</p>
                    <p>Rajin menabung</p>
                    <p>Memantau harga dengan rutin, agar kamu dapat menyesuaikan anggaranmu</p>
                    <p>Memanfaatkan platform investasi, akan kita bahas lebih lanjut</p>
                    <p>Inflasi itu wajar, Jangan mau merasa dikalahkan, Lawanlah inflasi dengan disiplin & strategi secara finansial</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:3}} />
            </>
        )
    };
}
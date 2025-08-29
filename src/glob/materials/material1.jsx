import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import imgdebgu from '/Level.svg';

export default function material1() {
    return {
        id: 1,
        load: 1,
        error: false,
        title: 'Pengenalan dengan Aset',
        desc: 'Membahas pengertian dari aset serta hal yang berinteraksi terhadap aset.',
        estimateDuration: '6 menit',
        submoduleData: [
            {
                id: 0,
                materialId: 1,
                desc: 'uang',
                terms: [
                    {
                        name: ['uang', 'duit', 'mata uang', 'rupiah', 'uang rupiah', ],
                        definition: [
                            'nilai tukar',
                            'alat penukar',
                            'standar pengukur nilai finansial yang dapat dihitung',
                            'suatu benda yang nilainya diterima oleh semua orang',
                            'benda yang dapat ditukarkan dalam bentuk jasa atau barang',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'uang yang disimpan di bank termasuk uang giral',
                        'uang kartal dikeluarkan oleh negara',
                        'nilai uang diterima oleh banyak orang',
                    ],
                    'false': [
                        'e-money termasuk uang kartal',
                        'uang giral adalah uang yang dikeluarkan oleh negara',
                        'uang hanyalah kertas berisi angka yang tak bermakna',
                    ],
                },
            },
            {
                id: 1,
                materialId: 1,
                desc: 'uang',
                terms: [
                    {
                        name: ['uang', 'duit', 'mata uang', 'rupiah', 'uang rupiah', ],
                        definition: [
                            'nilai tukar',
                            'alat penukar',
                            'standar pengukur nilai finansial yang dapat dihitung',
                            'suatu benda yang nilainya diterima oleh semua orang',
                            'benda yang dapat ditukarkan dalam bentuk jasa atau barang',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'uang yang disimpan di bank termasuk uang giral',
                        'uang kartal dikeluarkan oleh negara',
                        'nilai uang diterima oleh banyak orang',
                    ],
                    'false': [
                        'e-money termasuk uang kartal',
                        'uang giral adalah uang yang dikeluarkan oleh negara',
                        'uang hanyalah kertas berisi angka yang tak bermakna',
                    ],
                },
            },
        ],
        component: _ => (
            <>
                <SubModuleContainer id={{material_id:1,submodule_id:0}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h2>Aset</h2>
                    <p>Aset adalah suatu harta, sumber daya maupun kekayaan.</p>
                    <p>Aset dimiliki oleh suatu pihak.</p>
                    <p>Aset diharapkan dapat diubah menjadi keuntungan di masa mendatang.</p>
                    <p>Salah satu contoh aset ialah uangmu.</p>
                    <p>Selain uang, benda berharga pun juga termasuk aset.</p>
                    <p>Karena jika dijual, benda tersebut dapat ditukar dengan aset yang nilainya dianggap sesuai.</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Namun ingat, Nilai tukar aset dapat selalu berubah secara perlahan, tergantung dengan faktor-faktor tertentu.</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:0}} />
                <SubModuleContainer id={{material_id:1,submodule_id:1}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h2>Liabilitas</h2>
                    <p>Liabilitas adalah utang, kewajiban finansial maupun tagihan yang harus kamu bayar.</p>
                    <p>Dibayar dalam bentuk uang, barang maupun jasa.</p>
                    <p>Dalam kata lain, Liabilitas adalah hal yang menguras aset yang kamu miliki.</p>
                    <p>Liabilitas tidak dapat dihindari sepenuhnya, namun kamu dapat memahami cara pengelolaannya.</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Pengelolaan liabilitas harus bijak agar tidak membebani kodisi finansialmu.</p>
                    <p>Beberapa cara mengelola liabilitas ialah:</p>
                    <p>Memantau perkembangan dan jalannya utang.</p>
                    <p>Mencatat pembayaran, transaksi dan sisa utang maupun tagihan.</p>
                    <p>Menganalisa perencanaan anggaran yang cukup untuk membayar tagihan.</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:1}} />
                <SubModuleContainer id={{material_id:1,submodule_id:2}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h2>Tabungan</h2>
                    <p>Tabungan adalah sekumpulan aset / jumlah nilai</p>
                    <p>Menabung, simpelnya ialah menyimpan aset dengan harapan untuk mencapai jumlah nilai / aset tertentu</p>
                    <p>Kamu dapat menabung dimana saja</p>
                    <p>Mulai dari tabungan pribadi, hingga menabung di bank</p>
                    <p>Dalam menabung, kamu juga harus punya jangka waktu menabung sesuai dengan tujuanmu</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Jika tujuanmu untuk membeli gadget mahal, liburan maupun untuk jaga-jaga keadaan darurat</p>
                    <p>Jangka waktunya pendek, kurang dari 1 tahun atau hingga tabungan tersebut cukup untuk memenuhi tujuanmu</p>
                    <p>Jika tujuanmu untuk membiayai pendidikan maupun menyimpan modal usaha awal</p>
                    <p>Jangka waktunya menengah, sekitar 1 - 5 tahun</p>
                    <p>Jika tujuanmu untuk menyiapkan dana pensiun maupun dana pendidikan tinggi</p>
                    <p>Jangka waktunya panjang, melebihi 5 tahun</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Intinya, kamu harus selalu setia dan bijak dengan tujuanmu menabung</p>
                    <p>Jangan mengambil tabungan dana darurat untuk berliburan,</p>
                    <p>Jika kamu tidak ingin kehilangan tujuan menabungmu</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:2}} />
                <SubModuleContainer id={{material_id:1,submodule_id:3}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h1>Inflasi</h1>
                    <p>Inflasi ialah kenaikan harga barang maupun jasa secara umum.</p>
                    <p>Namun di sisi lain, Inflasi juga merupakan penurunan nilai uang secara menyeluruh .</p>
                    <p>[EXAMPLE] </p>
                    <p>TAB Harga 1 Nasi goreng di tahun 2015 = Rp5.000</p>
                    <p>TAB Harga 1 Nasi goreng di tahun 2015 = Rp10.000</p>
                    <p>Dalam 10 tahun, harga barang yang sama naik 100%, tidak cukup.</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Selain itu, jika kurang disiplin menabung, nilai tabungan pribadi akan terus berkurang.</p>
                    <p>Pengeluaran belanjaan tiap bulan tidak akan selalu sama seiring berganti tahun.</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Namun, kamu bisa banget melawan inflasi menggunakan beberapa strategi berikut:</p>
                    <p>TAB Kelola pengeluaranmu.</p>
                    <p>TAB Kelola gaya hidupmu.</p>
                    <p>TAB Memanfaatkan strategi penganggaran yang efektif.</p>
                    <p>TAB Rajin menabung.</p>
                    <p>TAB Jika sudah rajin menabung, kamu dapat memanfaatkan platform investasi, akan kita bahas lebih lanjut.</p>
                    <p>Pastikan kamu selalu up-to-date dengan harga-harga barang yang rutin kamu beli.</p>
                    <p>Dan selalu menyesuaikan penganggaranmu</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:1,submodule_id:3}} />
            </>
        )
    };
}
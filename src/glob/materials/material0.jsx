import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import imgdebgu from '/Level.svg';

export default function material0() {
    return {
        id: 0,
        load: 0,
        error: false,
        title: 'Dasar-Dasar Keuangan',
        desc: 'Membahas uang dari dasar, pembagian uang dengan bijak serta psikologi manusia terhadap uang.',
        submoduleData: [
            {
                id: 0,
                materialId: 0,
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
                materialId: 0,
                desc: 'budget',
                terms: [
                    {
                        name: ['budget', 'anggaran', 'dana', 'pencatatan anggaran',  ],
                        definition: [
                            'pencatatan dari keluar masuknya uang',
                            'pengelompokkan pemasukkan maupun pengeluaran uang',
                            'perkiraan pemasukan & pengeluaran uang di periode tertentu',
                        ],
                    },
                    {
                        name: ['budgeting', 'penganggaran', 'perencanaan keuangan', 'pengaturan dana', 'manajemen anggaran', 'alokasi keuangan', 'strategi pendanaan' ],
                        definition: [
                            'rencana anggaran di masa mendatang',
                            'perencanaan pengeluaran maupun pemasukkan uang',
                            'pengelompokkan uang yang membatasi pengeluaran',
                            'pembagian bijak dari uang sesuai kebutuhan dan rencana',
                            'metode untuk mengevaluasi dan menganalisis keluar masuknya uang',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'sisa dari budget dapat digunakan sebagai tabungan',
                        'budgeting yang efektif adalah budgeting yang realistis',
                        'salah satu manfaat dari budgeting ialah membasmi pemborosan',
                        'budgeting yang realistis adalah budgeting yang sesuai dengan keadaan finansial seseorang',
                    ],
                    'false': [
                        'budgeting bermanfaat agar boros pengeluaran',
                        'budgeting cocok untuk digunakan dalam membagi sedekah', // todo: think more
                        'sisa dari budget dapat dihabiskan untuk aktivitas rekreasi',
                    ],
                },
            },
            {
                id: 2,
                materialId: 0,
                desc: 'kebutuhan & keinginan',
                terms: [
                    {
                        name: ['kebutuhan', 'keperluan', 'keperluan pokok', 'dorongan hidup', ],
                        definition: [
                            'hal mutlak yang diperlukan untuk hidup',
                            'dorongan seseorang agar bisa mencukupi kebutuhan hidupnya',
                        ],
                    },
                    {
                        name: ['keinginan', 'kemauan', 'harapan', 'hasrat', ],
                        definition: [
                            'dorongan seseorang demi melengkapi hidupnya',
                            'dorongan untuk memiliki maupun mengalami sesuatu',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'makanan, air bersih dan tempat tinggal termasuk suatu kebutuhan',
                        'villa, tiket bioskop, dan vr headset termasuk contoh dari suatu keinginan',
                        'jika kebutuhanmu tidak dipenuhi, kualitas hidupmu akan hancur',
                    ],
                    'false': [
                        'keinginan harus selalu diprioritaskan',
                        'jika keinginanmu tidak terpenuhi, hidupmu akan hancur',
                        'tiket bioskop, villa dan drone ialah sebuah kebutuhan',
                        'agar kamu dapat hidup, kamu harus selalu mengprioritaskan keinginanmu',
                    ],
                },
            },
        ],
        component: _ => {
            return (
                <>
                    <SubModuleContainer id={{material_id:0,submodule_id:0}} minimizedMaxContentCount={3} minimizedHeight={'8rem'}>
                        <h1>Uang</h1>
                        <p>Uang adalah alat tukar pembayaran.</p>
                        <p>Uang juga digunakan sebagai Standar pengukur nilai (satuan hitung).</p>
                        <p>Misal, 1 Nasi Kotak = 8 AK, Sehingga 16 AK = 2 Nasi Kotak</p>
                        <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                        <p>Wujudnya beragam, mulai dari Uang koin, Uang kertas, Simpanan Bank, E-Money dan sebagiannya.</p>
                        <p>Uang koin, Uang kertas termasuk uang kartal yang dikeluarkan oleh negara.</p>
                        <p>Uang Simpanan di Bank, E-Money termasuk uang giral yang disimpan oleh jasa perbank-an.</p>
                    </SubModuleContainer>
                    <MiniQuizContainer id={{material_id:0,submodule_id:0}} />
                    <SubModuleContainer id={{material_id:0,submodule_id:1}} minimizedMaxContentCount={3} minimizedHeight={'10rem'}>
                        <h1>Anggaran & Penganggaran</h1>
                        <p>Anggaran (budget) adalah perkiraan pemasukan & pengeluaran uang di periode tertentu.</p>
                        <p>Penganggaran (budgeting) adalah rencana anggaran (budget) di masa mendatang.</p>
                        <img src={imgdebgu} alt="Ilustrasi perencanaan finansial" width="200px" />
                        <p>Penganggaran bertujuan untuk merencanakan dan mengevaluasi ekspektasi yang realistis dan sistematis.</p>
                        <p>Dengan penganggaran, kamu dapat membentuk ekspektasi realistis menyesuaikan dengan kondisi finansialmu.</p>
                        <p>Tanpa penganggaran, kamu akan mem-boros uang, bahkan lupa kemana kamu menghabiskan uangmu .</p>
                        <img src={imgdebgu} alt="Ilustrasi pemborosan" width="200px" />
                        <p>Penganggaran yang efektif adalah penganggaran yang realistis, sesuai kebutuhan & keinginanmu dengan kondisi finansialmu.</p>
                        {/* <p>Oleh karena itu, bijaklah membagi uangmu, pilihlah salah satu hal yang akan kamu gunakan dengan uangmu.</p>
                        <p></p> */}
                    </SubModuleContainer>
                    <MiniQuizContainer id={{material_id:0,submodule_id:1}} />
                    <SubModuleContainer id={{material_id:0,submodule_id:2}} minimizedMaxContentCount={4} minimizedHeight={'23rem'}>
                        <h1>Kebutuhan vs Keinginan</h1>
                        <p>Kebutuhan adalah hal mutlak yang diperlukan untuk hidup.</p>
                        <p>Seperti Air Bersih, Nasi Kotak, Tempat tinggal layak dan lainnya..</p>
                        <img src={imgdebgu} alt="Ilustrasi kebutuhan dasar" width="200px" />
                        <p>Keinginan adalah dorongan untuk memiliki atau mengalami sesuatu yang tidak selalu dibutuhkan untuk hidup.</p>
                        <p>Seperti Baju mewah, Makan di Restoran, Jalan-jalan keluar negri..</p>
                        <img src={imgdebgu} alt="Ilustrasi keinginan mewah" width="200px" />
                        <p>Kebutuhan harus selalu di prioritaskan terlebih dahulu sebelum memuaskan keinginan kita.</p>
                        <p>Jika kebutuhan tidak dipenuhi, kualitas hidup kita akan menurun.</p>
                        <p>Jika keinginan tidak dipenuhi, kamu hanya akan merasakan sedikit kekecewaan.</p>
                        <img src={imgdebgu} alt="Ilustrasi kualitas hidup" width="200px" />
                    </SubModuleContainer>
                    <MiniQuizContainer id={{material_id:0,submodule_id:2}} />
                </>
            )
        },
    }
}
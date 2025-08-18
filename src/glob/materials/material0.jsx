import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import imgdebgu from '/Level.svg';

export default function material0() {
    return {
        id: 0,
        load: 0,
        error: false,
        title: 'Dasar-Dasar Keuangan',
        desc: 'Mempelajari dasar-dasar keunangan',
        category : 'keuangan',
        terms: [
            {
                name: ['uang', ],
                definition: [
                    'alat penukar',
                    'alat tukar',
                    'bentuk fisik dari nilai',
                    'aset',
                    'benda yang dapat ditukarkan dalam bentuk jasa atau barang',
                ],
            },
            {
                name: ['budget', 'penganggaran', ],
                definition: [
                    'pembagian bijak dari uang sesuai kebutuhan',
                    'pengelompokkan nilai yang membatasi pengeluaran',
                ],
            },
        ],
        facts: {
            'true': [
                'budget dapat digunakan sebagai tabungan',
            ],
            'false': [
                'budgeting bermanfaat agar boros pengeluaran',
            ],
        },
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
                        <p>Oleh karena itu, bijaklah membagi uangmu, pilihlah salah satu hal yang akan kamu gunakan dengan uangmu.</p>
                        <p></p>
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
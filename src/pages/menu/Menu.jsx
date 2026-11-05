import FlipbookPdf from '../../components/FlipbookPdf'
import MenuLayout from '../../components/MenuLayout'

export default function MenuPage() {
  return (
    <MenuLayout
      title="Food Menu"
      text="Chatti’s menu brings the bold, aromatic flavors of Kerala’s toddy shops to life. From delicate seafood and spiced meats to signature Kerala breads and comforting curries, each dish is a tribute to time-honored traditions and regional ingredients."
    >
      {/* put your PDF at public/menu/chatti-menu.pdf */}
      <FlipbookPdf url="/menu/chatti-menu.pdf" />
    </MenuLayout>
  )
}

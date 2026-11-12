import FlipbookPdf from '../../components/FlipbookPdf'
import MenuLayout from '../../components/MenuLayout'
import Seo from '../../components/Seo'

export default function MenuPage() {
  return (
    <>
      <Seo title="Food Menu | Chatti by Chef Regi Mathew, Midtown Manhattan" description="Browse the Chatti food menu: Kerala seafood, spiced meats, toddy shop touchings, breads and curries by Chef Regi Mathew in New York." path="/menu" />
    <MenuLayout
      title="Food Menu"
      text="Chatti’s menu brings the bold, aromatic flavors of Kerala’s toddy shops to life. From delicate seafood and spiced meats to signature Kerala breads and comforting curries, each dish is a tribute to time-honored traditions and regional ingredients."
    >
      {/* put your PDF at public/menu/chatti-menu.pdf */}
      <FlipbookPdf url="/menu/chatti-menu.pdf" />
    </MenuLayout>
    </>
  )
}

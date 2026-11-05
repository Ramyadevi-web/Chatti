import FlipbookPdf from '../../components/FlipbookPdf'
import MenuLayout from '../../components/MenuLayout'

export default function MenuPage() {
  return (
    <MenuLayout
      title="Bar Menu"
      text="Chatti's bar celebrates the bold and tropical flavors of Kerala. From delicate, fruit-forward cocktails and spiced infusions to signature creations with coconut, chilies, and coastal botanicals, each pour is crafted to complement our food and honor regional traditions."
    >
      {/* put your PDF at public/menu/chatti-menu.pdf */}
      <FlipbookPdf url="/menu/Bar-Menu.pdf" />
    </MenuLayout>
  )
}

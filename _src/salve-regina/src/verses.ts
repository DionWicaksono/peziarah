/**
 * The scripture set along the figure's lines. Douay-Rheims (Challoner revision), public domain.
 *
 * To add verses: add a { text, ref } entry to any passage below.
 * To add a passage: add a key here and a label in LABELS; it appears in the dock automatically.
 * Every distinct character becomes a glyph in the atlas.
 */
export type Verse = { text: string; ref: string }

export const PASSAGES = {
  mary: [
    { ref: 'Isaias 7:14', text: 'Therefore the Lord himself shall give you a sign. Behold a virgin shall conceive, and bear a son, and his name shall be called Emmanuel.' },
    { ref: 'Luke 1:26-27', text: "And in the sixth month, the angel Gabriel was sent from God into a city of Galilee, called Nazareth, To a virgin espoused to a man whose name was Joseph, of the house of David; and the virgin's name was Mary." },
    { ref: 'Luke 1:28', text: 'And the angel being come in, said unto her: Hail, full of grace, the Lord is with thee: blessed art thou among women.' },
    { ref: 'Luke 1:30-31', text: 'And the angel said to her: Fear not, Mary, for thou hast found grace with God. Behold thou shalt conceive in thy womb, and shalt bring forth a son; and thou shalt call his name Jesus.' },
    { ref: 'Luke 1:34-35', text: 'And Mary said to the angel: How shall this be done, because I know not man? And the angel answering, said to her: The Holy Ghost shall come upon thee, and the power of the most High shall overshadow thee.' },
    { ref: 'Luke 1:37-38', text: 'Because no word shall be impossible with God. And Mary said: Behold the handmaid of the Lord; be it done to me according to thy word.' },
    { ref: 'Luke 1:42', text: 'Blessed art thou among women, and blessed is the fruit of thy womb.' },
    { ref: 'Luke 1:45', text: 'And blessed art thou that hast believed, because those things shall be accomplished that were spoken to thee by the Lord.' },
    { ref: 'Luke 2:7', text: 'And she brought forth her firstborn son, and wrapped him up in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.' },
    { ref: 'Luke 2:19', text: 'But Mary kept all these words, pondering them in her heart.' },
    { ref: 'Luke 2:35', text: 'And thy own soul a sword shall pierce, that, out of many hearts, thoughts may be revealed.' },
    { ref: 'Luke 2:51', text: 'And his mother kept all these words in her heart.' },
    { ref: 'John 2:5', text: 'His mother saith to the waiters: Whatsoever he shall say to you, do ye.' },
    { ref: 'John 19:25', text: "Now there stood by the cross of Jesus, his mother and his mother's sister, Mary of Cleophas, and Mary Magdalen." },
    { ref: 'John 19:26-27', text: 'When Jesus therefore had seen his mother and the disciple standing whom he loved, he saith to his mother: Woman, behold thy son. After that, he saith to the disciple: Behold thy mother.' },
    { ref: 'Acts 1:14', text: 'All these were persevering with one mind in prayer with the women, and Mary the mother of Jesus, and with his brethren.' },
    { ref: 'Apocalypse 12:1', text: 'And a great sign appeared in heaven: A woman clothed with the sun, and the moon under her feet, and on her head a crown of twelve stars.' },
  ],
  magnificat: [
    { ref: 'Luke 1:46-47', text: 'And Mary said: My soul doth magnify the Lord. And my spirit hath rejoiced in God my Saviour.' },
    { ref: 'Luke 1:48', text: 'Because he hath regarded the humility of his handmaid; for behold from henceforth all generations shall call me blessed.' },
    { ref: 'Luke 1:49', text: 'Because he that is mighty, hath done great things to me; and holy is his name.' },
    { ref: 'Luke 1:50', text: 'And his mercy is from generation unto generations, to them that fear him.' },
    { ref: 'Luke 1:51', text: 'He hath shewed might in his arm: he hath scattered the proud in the conceit of their heart.' },
    { ref: 'Luke 1:52', text: 'He hath put down the mighty from their seat, and hath exalted the humble.' },
    { ref: 'Luke 1:53', text: 'He hath filled the hungry with good things; and the rich he hath sent empty away.' },
    { ref: 'Luke 1:54-55', text: 'He hath received Israel his servant, being mindful of his mercy: As he spoke to our fathers, to Abraham and to his seed for ever.' },
  ],
  passion: [
    { ref: 'Luke 2:34-35', text: 'And Simeon blessed them, and said to Mary his mother: Behold this child is set for the fall, and for the resurrection of many in Israel, and for a sign which shall be contradicted; And thy own soul a sword shall pierce, that, out of many hearts, thoughts may be revealed.' },
    { ref: 'Isaias 53:5', text: 'But he was wounded for our iniquities, he was bruised for our sins: the chastisement of our peace was upon him, and by his bruises we are healed.' },
    { ref: 'John 19:1-2', text: 'Then therefore Pilate took Jesus and scourged him. And the soldiers platting a crown of thorns, put it upon his head: and they put on him a purple garment.' },
    { ref: 'John 19:5', text: '(Jesus therefore came forth, bearing the crown of thorns and the purple garment.) And he saith to them: Behold the Man.' },
    { ref: 'John 19:17-18', text: 'And bearing his own cross, he went forth to the place which is called Calvary, but in Hebrew Golgotha. Where they crucified him, and with him two others, one on each side, and Jesus in the midst.' },
    { ref: 'John 19:19', text: 'And Pilate wrote a title also: and he put it upon the cross. And the writing was: JESUS OF NAZARETH, THE KING OF THE JEWS.' },
    { ref: 'John 19:25', text: "Now there stood by the cross of Jesus, his mother and his mother's sister, Mary of Cleophas, and Mary Magdalen." },
    { ref: 'John 19:26-27', text: 'When Jesus therefore had seen his mother and the disciple standing whom he loved, he saith to his mother: Woman, behold thy son. After that, he saith to the disciple: Behold thy mother. And from that hour, the disciple took her to his own.' },
    { ref: 'John 19:28', text: 'Afterwards, Jesus knowing that all things were now accomplished, that the scripture might be fulfilled, said: I thirst.' },
    { ref: 'John 19:30', text: 'Jesus therefore, when he had taken the vinegar, said: It is consummated. And bowing his head, he gave up the ghost.' },
    { ref: 'John 19:34', text: 'But one of the soldiers with a spear opened his side: and immediately there came out blood and water.' },
    { ref: 'Lamentations 1:12', text: 'O all ye that pass by the way, attend, and see if there be any sorrow like to my sorrow.' },
  ],
} satisfies Record<string, Verse[]>

export type PassageId = keyof typeof PASSAGES

/** Dock labels, in Indonesian. */
export const LABELS: Record<PassageId, string> = { mary: 'Maria', magnificat: 'Magnificat', passion: 'Sengsara' }

/** One continuous stream: each verse, its reference, then a separator. */
export function passageText(id: PassageId): string {
  return PASSAGES[id].map((v) => `${v.text} — ${v.ref}`).join('  ·  ') + '  ·  '
}

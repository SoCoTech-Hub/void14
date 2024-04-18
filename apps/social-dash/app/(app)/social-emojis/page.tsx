import SocialEmojiList from "@/components/socialEmojis/SocialEmojiList";
import NewSocialEmojiModal from "@/components/socialEmojis/SocialEmojiModal";
import { api } from "@/lib/trpc/api";

export default async function SocialEmojis() {
  const { socialEmojis } = await api.socialEmojis.getSocialEmojis.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Social Emojis</h1>
        <NewSocialEmojiModal />
      </div>
      <SocialEmojiList socialEmojis={socialEmojis} />
    </main>
  );
}

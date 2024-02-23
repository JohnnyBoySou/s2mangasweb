import {DiscussionEmbed} from "disqus-react"
const DisqusComments = ({ id, name }) => {
  const disqusShortname = "s2mangas-1"
  const disqusConfig = {
    url: "https://www.s2mangas.com/manga/",
    identifier: id, 
    title: name 
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;
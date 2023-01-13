import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ContentCallToAction = (props) => {
  console.log(props);
  return (
    <div className="blockContentContainer">
      {
        props.title
        ? <h3>{props.title}</h3>
        : null
      }
      {documentToReactComponents(props.context)}
    </div>
  )
}

export default ContentCallToAction;
# scaled-component
Scale a react component dynamically to a height/width

For use with dynamically rendered components, such as those loaded from external sources https://github.com/bewestphal/url-component, to fit to a container component.

# Example Usage

```
class RenderComponentPreview extends Component {
  constructor(props) {
    super(props)
    this.preview = React.createRef();
  }

  onImportLoad = () => {
    this.preview.current.setComponentSize()
  }

  render() {
    const {componentDef} = this.props
    
    var url = "https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.32.3/react-bootstrap.min.js"
    
    return (
      <ScaledComponent
        wrapperClass={styles.wrapperClass}
        maxHeight={150}
        maxWidth={150}
        ref={this.preview}
      >
        <URLComponent
          componentName="Alert"
          url={url}
          onComponentLoaded={this.onComponentLoadedCallback}
        >
          Alert Text
        </URLComponent>
      </ScaledComponent>
    )
  }
}
```

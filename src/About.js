import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { AboutHeader } from './Header'
import classnames from 'classnames'
import Anime from 'react-anime'

const ContactItem = (props) => {
  return (
    <li>
      <div className={'aboutItemTitle'}>{props.title}</div>
      <span className={'aboutItemBody'}>
        <div className={'smallDash'}/>
        <div className={'content'}>
          <p>{props.content}</p>
        </div>
        </span>
    </li>
  )
}

export default class About extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      open: false,
      hover: false,
      arrowHover: false,
      imgLoaded: false,
      metaSectionClassArray: ['about-meta', 'about-closed'],
      portraitStyle: {},
    }
  }

  makeList = (clientList) => {
    return <Markdown source={clientList} />
  }

  parseInstagram = (inputString) => {
    if (inputString) {
      let username
      let handle
      if (inputString.charAt(0) === '@') {
        username = inputString.substr(1)
        handle = inputString
      } else {
        username = inputString
        handle = '@' + inputString
      }
      return (
        <a href={`https://www.instagram.com/${username}/`}>{handle}</a>
      )
    }
  }

  returnEmail = (email) => {
    return (
      <a href={`mailto:${email}`} target={'_top'}>{email}</a>
    )
  }

  handleToggleHover = (key) => {
    this.setState.hover({
      hover: !this.state.hover,
    })
  }

  applyMetaSectionClass = () => {
    return this.state.metaSectionClassArray.join(' ')
  }


  toggleMetaTray = (e) => {
    e.preventDefault()
      this.setState({
        open: !this.state.open,
      })
  }

  switchLine1 = () => {
      return !this.state.arrowHover ? "M75,125 L75,24.5" : "M75,125 L75,5.5"
  }

  switchLine2 = () => {
      return !this.state.arrowHover ? "M75,24 L88,38" : "M75,4 L88,18"
  }

  switchLine3 = () => {
      return !this.state.arrowHover ? "M75,24 L62,38" : "M75,4 L62,18"
  }



  render() {
    const contact = this.props.contact
    const trayStyle = classnames({
      'tray-open': this.state.open,
      'tray-open-hover': this.state.open && this.state.hover,
      'tray-closed': !this.state.open,
      'tray-closed-hover': !this.state.open && this.state.hover,
    })

    const trayTransitionClasses = classnames({
      'tray-in': !this.props.aboutOpen,
      'tray-out': this.props.aboutOpen,
      'trayWrapper_tray-open': this.state.open,
      'trayWrapper_tray-closed': !this.state.open,
      'autoPointerEvents': this.state.open,
      'noPointerEvents': !this.state.open,
    })

    const aboutClasses = classnames({
      'about-open': this.props.aboutOpen,
      'about-closed': !this.props.aboutOpen,
    })

    const representationHeading = contact.representationCompany ? `Representation – ${contact.representationCompany}` : 'Representation'
    const portraitStyle = { backgroundImage: `url(${this.props.portrait.url})` }
    const duration= 300

    return (
      <main id={'about'} className={aboutClasses} >
      <div id={'aboutScrollContainer'}>
      <AboutHeader {...this.props} />
      <div id={'contentWrapper'}>
        <div id={'aboutArrowContainer'}
          onClick={(e) => this.toggleMetaTray(e)}
          onMouseEnter={() => this.setState({arrowHover: true, hover: true })}
          onMouseLeave={() => this.setState({arrowHover:false})}>
          <Anime duration={duration} easing="easeInOutCubic">
          <svg id={'trayArrowSVG'}
            width="150px"
            height="150px"
            style={this.state.open ? {transform: 'rotate(180deg)', transition:'transform, 300ms'} : {transition:'transform, 300ms'}} // ouchey
            viewBox="0 0 150 150"
            version="1.1">
            <g id="Groups" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
              <g id="Tray-arrow" stroke="#FFF">
                <Anime duration={duration} easing="easeInOutCubic" d={this.switchLine1()}>
                  <path d="M75,125 L75,25" id="Line-1"></path>
                </Anime>
                <Anime duration={duration} easing="easeInOutCubic" d={this.switchLine2()}>
                  <path d="M75,24 L88,38" id="Line-2"></path>
                </Anime>
                <Anime duration={duration} easing="easeInOutCubic" d={this.switchLine3()}>
                  <path d="M75,24 L62,38" id="Line-3"></path>
                </Anime>
              </g>
            </g>
          </svg>
          </Anime>
        </div>

        <section className={'bio'}>
          <Markdown source={this.props.biography} />
          <div className={'colophon'}>
            <p>{'Site by'}</p>
            <a href={'http://www.phil-cao.com/'}>{'Phil Cao'}</a>
            <p>{' and'}</p>
            <a href={'http://www.gav.space'}>{'Gavin Atkinson'}</a>
          </div>
        </section>
        <section id={'bio-portrait'} style={portraitStyle}>
          <div id={'bio-portrait-credit'}>{this.props.portraitCredit}</div>
        </section>

        <div id={'trayWrapper'} className={trayTransitionClasses}>
          <section
            id={'tray'}
            className={trayStyle}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false})}>
            <div className={'about-left'}>
            <ul>
              <ContactItem title={'Email'} content={this.returnEmail(contact.email)} />
              <ContactItem title={'Instagram'} content={this.parseInstagram(contact.instagram)} />
              {
                contact.representation !== "" ? <ContactItem title={representationHeading} content={contact.representation} /> : null
              }
            </ul>
            <div className={'clientList'}>
              <ContactItem title={'Clients'} content={this.makeList(this.props.clientList)} />
            </div>
            </div>
            <div className={'about-right'}>
              <div className={'clientList'}>
                <ContactItem title={'Exhibitions'} content={this.makeList(this.props.exhibitionList)} />
              </div>
              <div className={'clientList'}>
                <ContactItem title={'Press'} content={this.makeList(this.props.pressList)} />
              </div>
            </div>
          </section>
        </div>
        </div>
        </div>
      </main>
    )
  }
}

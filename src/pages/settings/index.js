import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DashLayout } from "../../layout";
import {
  PageContainer,
  PageTitle,
  FlexInline,
  SimpleButton
} from "../../components";
import { setLoading } from "../../redux/actions/global";
import * as FileUpload from "../../services/FileUpload";
import {
  SettingsSubTitle,
  LandingScreenItem,
  LandingScreenItemTitle,
  HelpIcon,
  SettingButton,
  ColorSelector,
  GradientButton,
  ColorText,
  LogoImage,
  HelpScreenInput,
  HelpScreenText,
  HelpScreenContainer
} from "./components";
import { GetButtonType, GetTheme, PostTheme } from "../../apis/theme";
import {
  GetContactType,
  GetContactInfoById,
  GetContactInfo,
  GetChannelType,
  PostContact
} from "../../apis/contact";
import { UploadImage } from "../../apis/document";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button_type: [],
      button_list: [],
      contactData: [],
      logo_url: null,
      theme_data: null
    };
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    const btn_res = await GetButtonType({ dispatch });
    const theme_res = await GetTheme({ dispatch });
    const conInfo_res = await GetContactInfo({ dispatch });
    const conData = await Promise.all(
      conInfo_res.payload.map(async item => {
        const conData_res = await GetContactInfoById({
          dispatch,
          id: item.contactId
        });
        return conData_res.payload;
      })
    );
    dispatch(setLoading(false));
    if (!theme_res.success || !btn_res.success) return;
    this.setState({
      logo_url: theme_res.payload.logoUrlDesktop,
      button_list: theme_res.payload.buttonList,
      button_type: btn_res.payload,
      theme_data: theme_res.payload,
      contactData: conData
    });
  }
  getButtonString = type => {
    const { button_type } = this.state;
    const btn = button_type.find(item => item.typeId === type);
    return btn !== undefined ? btn.typeValue : "";
  };
  setColor = (buttonType, colorType, value) => {
    const { button_list } = this.state;
    const new_list = button_list.map(item => {
      if (item.buttonType === buttonType) item[`colour${colorType}`] = value;
      return item;
    });
    this.setState({ button_list: new_list });
  };
  onChangeLogo = () => {
    const { dispatch } = this.props;
    const fileSelector = FileUpload.buildFileSelector(e => {
      UploadImage({
        dispatch,
        file: e.target.files[0]
      }).then(res => {
        if (!res.success) return;
        this.setState({ logo_url: res.payload[0].publicUrl });
      });
    });
    fileSelector.click();
  };
  onChannelInputChange = (contactId, channelId, value) => {
    const { contactData } = this.state;
    const newContactData = contactData.map(item => {
      if (item.contactId !== contactId) return item;
      const channelList = item.channelList.map(channelItem => {
        if (channelItem.channelId !== channelId) return channelItem;
        return { ...channelItem, channelDetail: value };
      });
      return { ...item, channelList: channelList };
    });
    this.setState({ contactData: newContactData });
  };
  onSave = async () => {
    const { theme_data, button_list, logo_url, contactData } = this.state;
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    const data_th = {
      ...theme_data,
      buttonList: button_list,
      logoUrlDesktop: logo_url
    };
    const res_theme = await PostTheme({ dispatch, data: data_th });
    const res_contact = await Promise.all(
      contactData.map(async item => await PostContact({ dispatch, data: item }))
    );
    dispatch(setLoading(false));
    console.log(res_contact);
  };
  render() {
    const { button_list, logo_url, contactData } = this.state;
    return (
      <DashLayout>
        <PageTitle>Settings</PageTitle>
        <PageContainer>
          <SettingsSubTitle>Landing Screen</SettingsSubTitle>
          <FlexInline top>
            <LandingScreenItem>
              <LandingScreenItemTitle>Council Logo</LandingScreenItemTitle>
              <FlexInline>
                <SettingButton onClick={this.onChangeLogo}>
                  Change Logo
                </SettingButton>
                <LogoImage src={logo_url} />
              </FlexInline>
            </LandingScreenItem>
            {button_list.map((item, key) => (
              <LandingScreenItem key={key}>
                <LandingScreenItemTitle>
                  "{this.getButtonString(item.buttonType)}" Button Colour
                  <HelpIcon />
                </LandingScreenItemTitle>
                <FlexInline>
                  <div>
                    <ColorText>Colour1</ColorText>
                    <ColorSelector
                      value={item.colour1}
                      onChange={e =>
                        this.setColor(item.buttonType, 1, e.target.value)
                      }
                      style={{ marginBottom: 4 }}
                    />
                    <ColorText>Colour2</ColorText>
                    <ColorSelector
                      value={item.colour2}
                      onChange={e =>
                        this.setColor(item.buttonType, 2, e.target.value)
                      }
                    />
                  </div>
                  <GradientButton color1={item.colour1} color2={item.colour2}>
                    {this.getButtonString(item.buttonType)}
                  </GradientButton>
                </FlexInline>
              </LandingScreenItem>
            ))}
          </FlexInline>
          <FlexInline top>
            {contactData.map((item, key) => (
              <HelpScreenContainer style={{ marginRight: 50 }} key={key}>
                <SettingsSubTitle style={{ marginTop: 50 }}>
                  {item.title}
                </SettingsSubTitle>
                {item.channelList.map((channelItem, channelkey) => (
                  <React.Fragment key={channelkey}>
                    <HelpScreenText>{channelItem.channelName}</HelpScreenText>
                    <HelpScreenInput
                      value={channelItem.channelDetail}
                      onChange={e =>
                        this.onChannelInputChange(
                          item.contactId,
                          channelItem.channelId,
                          e.target.value
                        )
                      }
                    />
                  </React.Fragment>
                ))}
              </HelpScreenContainer>
            ))}
          </FlexInline>

          <SimpleButton
            style={{ margin: "80px auto 20px" }}
            onClick={this.onSave}
          >
            Save
          </SimpleButton>
        </PageContainer>
      </DashLayout>
    );
  }
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
};
export default connect()(SettingsPage);

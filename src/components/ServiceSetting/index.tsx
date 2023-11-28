import { InputField } from '../InputField';
import { TypographySubTitle } from '../MuiStyled/Typography';
import { ModuleSubMenuContainer } from '../MuiStyled/Div';

export const ServiceSetting = ({ updateModuleData, initialData }) => {
  const handleChange = (event) => {
    const name = event.target.getAttribute('name');
    const value = event.target.value;
    updateModuleData(name, value);
  };
  return (
    <ModuleSubMenuContainer>
      <TypographySubTitle variant="h6">서비스 설정</TypographySubTitle>
      {/* {Object.entries(data).map(([key, value]) => (
        <InputField
          onChange={(field, fieldValue) =>
            onChangeHandler('ServiceSetting', field, fieldValue)
          }
          key={key}
          title={key}
          value={value}
        />
      ))} */}
    </ModuleSubMenuContainer>
  );
};

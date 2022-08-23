import { LoadingFullScreen } from "components/LoadingFullScreen";
import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ProfileContextType } from "store/context-types/ProfileContextType";
import { IProfile } from "types/type";
import { callAPI, getProfile } from "utils/api-hepler";
import { login } from "utils/zgs-helpder";

const ProfileContext = createContext<ProfileContextType | null>(null);

export { ProfileContext };

const ProfileProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [profile, setProfile] = useState<IProfile>();

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    document.body.addEventListener("user_login", () => {
      setIsReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady) {
      console.log("initialize_app");

      const zgsk = localStorage.getItem("zgsk");
      console.log("==== ~ useEffect ~ zgsk", zgsk);
      if (!zgsk) login();
      else setIsReady(true);
    } else if (window.location.href.includes("error")) {
      setIsReady(true);
    }
  }, [isReady]);
  useEffect(() => {
    const getData = async () => {
      if (window.location.href.includes("error")) {
        return;
      }
      if (!profile && isReady) {
        console.log('ddadaud');
        await callAPI(getProfile, [], setProfile);
      }
    };
    getData();
  }, [profile, isReady]);
  return isReady ? (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  ) : (
    <div className="height-100vh">
      <LoadingFullScreen />
    </div>
  );
};

export default ProfileProvider;

import HomePage from "../../features/home/HomePage";

type Page = {
  name: string;
  path: string;
  exact?: boolean;
  component: React.FC;
}

export const pages: Page[] = [
  {
    name: 'Home',
    path: '/',
    component: HomePage,
    exact: true
  }
]
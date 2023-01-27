import { ContentfulService } from "./contentful.service";

export namespace PageService {
  export async function getHomePage() {
    const homePageInfo = await ContentfulService.getHomePage();
    return homePageInfo;
  }
}

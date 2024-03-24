import { Icon } from "../../icons";

function LinkButtonWithIcon({}) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-primary-foreground">
        <Icon.Upload />
      </span>
      <span>Upload</span>
    </div>
  );
}

export { LinkButtonWithIcon };

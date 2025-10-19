# @digicroz/react-maintenance-pages

🚧 Reusable and type-safe React maintenance overlay component.

## Installation

```bash
npm install @digicroz/react-maintenance-pages
```

## Usage

```tsx
import { MaintenanceOverlay } from "@digicroz/react-maintenance-pages"

function App() {
  return (
    <MaintenanceOverlay
      message="We're upgrading our systems to serve you better."
      brandName="Acme Corp"
      expectedCompletion="2 hours"
    />
  )
}
```

## Props

| Prop                 | Type              | Required | Default                          | Description              |
| -------------------- | ----------------- | -------- | -------------------------------- | ------------------------ |
| `message`            | `string`          | ✅       | -                                | Main maintenance message |
| `brandName`          | `string`          | ✅       | -                                | Your company/brand name  |
| `enabled`            | `boolean`         | ❌       | `true`                           | Show/hide overlay        |
| `title`              | `string`          | ❌       | `"Site Under Maintenance"`       | Main title               |
| `subtitle`           | `string`          | ❌       | `"Please visit us later."`       | Subtitle text            |
| `expectedCompletion` | `string`          | ❌       | -                                | Expected completion time |
| `thankYouMessage`    | `string`          | ❌       | `"Thank you for your patience!"` | Custom thank you message |
| `brandLogoUrl`       | `string`          | ❌       | -                                | URL to your logo image   |
| `brandIcon`          | `React.ReactNode` | ❌       | -                                | Custom icon element      |
| `showSpinner`        | `boolean`         | ❌       | `true`                           | Show loading spinner     |
| `showThankYou`       | `boolean`         | ❌       | `true`                           | Show thank you message   |
| `desktopOnly`        | `boolean`         | ❌       | `false`                          | Only show on desktop     |
| `className`          | `string`          | ❌       | `""`                             | Additional CSS classes   |

## Examples

### With Logo

```tsx
<MaintenanceOverlay
  message="We're upgrading our systems"
  brandName="Acme Corp"
  brandLogoUrl="/logo.png"
/>
```

### Fully Customized

```tsx
<MaintenanceOverlay
  message="Major system upgrade in progress"
  brandName="Acme Corp"
  title="System Upgrade"
  subtitle="We'll be back soon!"
  expectedCompletion="2 hours"
  thankYouMessage="We appreciate your patience!"
  brandLogoUrl="/logo.png"
  showSpinner={true}
  showThankYou={true}
/>
```

### Disable Temporarily

```tsx
<MaintenanceOverlay message="..." brandName="Acme Corp" enabled={false} />
```

## Features

✅ Type-safe with TypeScript  
✅ Fully responsive design  
✅ Animated loading spinner  
✅ Customizable branding (logo/icon)  
✅ Tailwind CSS styling  
✅ Zero dependencies (peer deps: React 18+)

## License

MIT © [DigiCroz](https://github.com/digicroz)

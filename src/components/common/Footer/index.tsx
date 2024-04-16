import type { ReactElement, ReactNode } from 'react'
import { SvgIcon, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from './styles.module.css'
import { AppRoutes } from '@/config/routes'
import packageJson from '../../../../package.json'
import AppstoreButton from '../AppStoreButton'
import ExternalLink from '../ExternalLink'
import MUILink from '@mui/material/Link'
import { HELP_CENTER_URL, IS_DEV, IS_OFFICIAL_HOST } from '@/config/constants'

const footerPages = [
  AppRoutes.welcome.index,
  AppRoutes.settings.index,
  AppRoutes.imprint,
  AppRoutes.privacy,
  AppRoutes.cookie,
  AppRoutes.terms,
  AppRoutes.licenses,
]

const FooterLink = ({ children, href }: { children: ReactNode; href: string }): ReactElement => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <MUILink>{children}</MUILink>
    </Link>
  ) : (
    <MUILink>{children}</MUILink>
  )
}

const Footer = (): ReactElement | null => {
  const router = useRouter()

  if (!footerPages.some((path) => router.pathname.startsWith(path))) {
    return null
  }

  const getHref = (path: string): string => {
    return router.pathname === path ? '' : path
  }

  return (
    <footer className={css.container}>
      <ul>
        {IS_OFFICIAL_HOST || IS_DEV ? (
          <>
            <li>
              <Typography variant="caption">&copy;{new Date().getFullYear()} Bitrock Safe</Typography>
            </li>
            <li>
              <ExternalLink href="https://www.bit-rock.io/" noIcon sx={{ span: { textDecoration: 'underline' } }}>
                Bitrock Network
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://docs.bit-rock.io/" noIcon sx={{ span: { textDecoration: 'underline' } }}>
                Bitrock Documentation
              </ExternalLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.settings.index)}>Preferences</FooterLink>
            </li>
          </>
        ) : (
          <li>{'This is an unofficial distribution of Bitrock Safe'}</li>
        )}

        <li>
          <ExternalLink href={`${packageJson.homepage}/releases/tag/v${packageJson.version}`} noIcon>
            <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> v{packageJson.version}
          </ExternalLink>
        </li>
      </ul>
    </footer>
  )
}

export default Footer

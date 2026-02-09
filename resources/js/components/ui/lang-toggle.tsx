
import { useTranslation } from 'react-i18next'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Globe } from 'lucide-react'

export default function LangToggle() {

        const { t, i18n } = useTranslation();
    
        function changeLanguage(lang: string) {
            i18n.changeLanguage(lang);
        }
  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="w-[140px]">
                    <Globe className="w-4 h-4 mr-2 text-white" />
                    <SelectValue className='text-white' placeholder={t('common.select-language')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en"> English </SelectItem>
                    <SelectItem value="ar"> العربية </SelectItem>
                </SelectContent>
            </Select>
  )
}

import { FABC } from '../lib/constants'

const FABC_PATTERN = /Fil-American Baptist Church(?: \(FABC\))?/g

export function TextWithFabcLinks({ text }: { text: string }) {
  const parts = text.split(FABC_PATTERN)
  const matches = text.match(FABC_PATTERN) ?? []

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {part}
          {index < matches.length ? (
            <a href={FABC.website} target="_blank" rel="noopener noreferrer">
              {matches[index]}
            </a>
          ) : null}
        </span>
      ))}
    </>
  )
}

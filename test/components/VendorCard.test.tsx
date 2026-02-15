import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { VendorCard } from '@/components/VendorCard'

describe('VendorCard Component', () => {
  const mockVendor = {
    id: 'vendor-1',
    businessName: 'Beautiful Gardens Venue',
    category: 'VENUE' as const,
    suburb: 'Newcastle',
    state: 'NSW',
    priceRange: 'MODERATE' as const,
    capacity: 150,
    servicesOffered: ['Indoor ceremony', 'Outdoor ceremony', 'Reception'],
    styles: ['Romantic', 'Garden', 'Elegant'],
    website: 'https://example.com',
    phone: '0400 000 000',
    email: 'info@example.com',
    verified: true,
    responseRate: 95,
    address: '123 Garden St',
    coordinates: null,
    lastContacted: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('should render vendor category and location', () => {
    render(
      <VendorCard
        vendor={mockVendor}
        selected={false}
        onToggleSelect={() => {}}
        matchScore={85}
        matchReasons={['Great location', 'Perfect capacity']}
      />
    )

    // Check category is displayed
    expect(screen.getByText('VENUE')).toBeInTheDocument()
    // Check location is displayed
    expect(screen.getByText(/Newcastle/)).toBeInTheDocument()
  })

  it('should show match score', () => {
    render(
      <VendorCard
        vendor={mockVendor}
        selected={false}
        onToggleSelect={() => {}}
        matchScore={85}
        matchReasons={['Great location']}
      />
    )

    expect(screen.getByText(/85%/)).toBeInTheDocument()
  })

  it('should call onToggleSelect when checkbox is clicked', async () => {
    const onToggleSelect = vi.fn()

    render(
      <VendorCard
        vendor={mockVendor}
        selected={false}
        onToggleSelect={onToggleSelect}
        matchScore={85}
        matchReasons={['Great location']}
      />
    )

    // Find checkbox button (it's rendered as a button, not input type checkbox)
    const checkbox = screen.getAllByRole('button')[0] // First button is the checkbox
    checkbox.click()

    expect(onToggleSelect).toHaveBeenCalledWith(mockVendor.id)
  })

  it('should render when selected', () => {
    // Test that the component renders without errors when selected=true
    const { container } = render(
      <VendorCard
        vendor={mockVendor}
        selected={true}
        onToggleSelect={() => {}}
        matchScore={85}
        matchReasons={['Great location']}
      />
    )

    // Component should render the card container
    const card = container.querySelector('.group')
    expect(card).toBeTruthy()
  })

  it('should display wedding styles', () => {
    render(
      <VendorCard
        vendor={mockVendor}
        selected={false}
        onToggleSelect={() => {}}
        matchScore={85}
        matchReasons={['Great location']}
      />
    )

    // Vendor has styles: ['Romantic', 'Garden', 'Elegant']
    expect(screen.getByText('Romantic')).toBeInTheDocument()
    expect(screen.getByText('Garden')).toBeInTheDocument()
    expect(screen.getByText('Elegant')).toBeInTheDocument()
  })

  it('should display view details button', () => {
    render(
      <VendorCard
        vendor={mockVendor}
        selected={false}
        onToggleSelect={() => {}}
        matchScore={85}
        matchReasons={['Great location']}
      />
    )

    expect(screen.getByText('View Details')).toBeInTheDocument()
  })

  it('should display price range indicator', () => {
    render(
      <VendorCard
        vendor={mockVendor}
        selected={false}
        onToggleSelect={() => {}}
        matchScore={85}
        matchReasons={['Great location']}
      />
    )

    // Moderate price range shows as $$
    expect(screen.getByText('$$')).toBeInTheDocument()
  })
})

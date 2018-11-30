import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import banner from '@/components/banner'
import annunciate from '@/components/annunciate'
import buyTicket from '@/components/buyTicket/buyTicket'
import getTicket from '@/components/getTicket/getTicket'
import payment from '@/components/payment/payment'
import succeed from '@/components/payment/succeed'
import myfooter from '@/components/footer'
import memberDiscern from '@/components/memberDiscern/memberDiscern'
import qrcodeScan from '@/components/memberDiscern/qrcodeScan'
import getTicketType from '@/components/memberDiscern/getTicketType'
import information from '@/components/information/information'
import personalInfo from '@/components/information/child/personalInfo'
import xfjl from '@/components/information/child/xfjl'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: banner,
        annunciate: annunciate,
        index: index,
        myfooter: myfooter
      }
    },
    {
      path: '/buyTicket',
      name: 'buyTicket',
      components: {
        default: banner,
        annunciate: annunciate,
        index: buyTicket,
        myfooter: myfooter
      }
    },
    {
      path: '/payment',
      name: 'payment',
      components: {
        default: banner,
        annunciate: annunciate,
        index: payment,
        myfooter: myfooter
      }
    },
    {
      path: '/succeed',
      name: 'succeed',
      components: {
        default: banner,
        annunciate: annunciate,
        index: succeed,
        myfooter: myfooter
      }
    },
    {
      path: '/getTicket',
      name: 'getTicket',
      components: {
        default: banner,
        annunciate: annunciate,
        index: getTicket,
        myfooter: myfooter
      }
    },
    {
      path: '/memberDiscern',
      name: 'memberDiscern',
      components: {
        default: banner,
        annunciate: annunciate,
        index: memberDiscern,
        myfooter: myfooter
      }
    },
    {
      path: '/information',
      name: 'information',
      components: {
        default: banner,
        annunciate: annunciate,
        index: information,
        myfooter: myfooter
      },
      children: [
        { path: 'personalInfo', name: 'personalInfo', component: personalInfo },
        { path: 'xfjl', name: 'xfjl', component: xfjl }
      ]
    },
    {
      path: '/qrcodeScan',
      name: 'qrcodeScan',
      components: {
        default: banner,
        annunciate: annunciate,
        index: qrcodeScan,
        myfooter: myfooter
      }
    },
    {
      path: '/getTicketType',
      name: 'getTicketType',
      components: {
        default: banner,
        annunciate: annunciate,
        index: getTicketType,
        myfooter: myfooter
      }
    }
  ]
})
